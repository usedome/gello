import { FC, useContext, Dispatch } from "react";
import { useHistory } from "react-router-dom";
import {
  VStack,
  Flex,
  Text,
  Heading,
  Switch,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  useUpdateResource,
  useDeleteResource,
  TAppAction,
} from "../../../store";
import { TResourceComponent } from "./types";
import { DeleteConfirmation } from "../../";
import { ResourceUrl } from "./ResourceUrl";
import { ResourceMenu } from "./ResourceMenu";
import { AppContext, TAppState } from "../../../contexts";

export const Resource: FC<TResourceComponent> = ({
  name,
  uuid,
  description,
  is_active,
  edit,
}) => {
  const [{ networkOperation }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenUrl,
    onOpen: onOpenUrl,
    onClose: onCloseUrl,
  } = useDisclosure();
  const history = useHistory();
  const updateResource = useUpdateResource();
  const deleteResource = useDeleteResource();

  const handleStatusChange = async () => {
    await updateResource(uuid, { is_active: !is_active });
  };

  const handleEdit = () => {
    edit(uuid);
  };

  const handleDelete = async () => {
    await deleteResource(uuid, onCloseDelete);
  };

  return (
    <VStack
      w="100%"
      p={5}
      bg="white"
      boxShadow="sm"
      align="flex-start"
      spacing={4}
    >
      <Flex justify="space-between" alignItems="center" w="100%">
        <Heading
          color="charlestonGreen"
          fontFamily="openSans"
          fontSize="sm"
          textTransform="uppercase"
        >
          {name}
        </Heading>
        <ResourceMenu
          handleEdit={handleEdit}
          handleViewUrl={onOpenUrl}
          handleViewBackups={() => {
            history.push(`/resources/${uuid}/backups`);
          }}
          handleDelete={onOpenDelete}
        />
      </Flex>
      <Flex alignItems="center" justify="space-between" w="100%">
        <Text textTransform="lowercase" fontSize="0.97rem">
          {description && Boolean(description)
            ? description.length > 60
              ? description.slice(0, 57) + "..."
              : description
            : "----"}
        </Text>
        <HStack align="center">
          {networkOperation === `update.resource.${uuid}` && (
            <Spinner size="sm" mt="2px" />
          )}
          <Switch
            colorScheme="green"
            onChange={handleStatusChange}
            isChecked={is_active}
          />
        </HStack>
      </Flex>
      <ResourceUrl
        name={name}
        uuid={uuid}
        isOpen={isOpenUrl}
        onClose={onCloseUrl}
      />
      <DeleteConfirmation
        isOpen={isOpenDelete}
        handleDelete={handleDelete}
        onClose={onCloseDelete}
        title="Delete Resource"
        networkOperation="delete.resource"
      >
        <Text>Are you sure you want to delete {name} ?</Text>
      </DeleteConfirmation>
    </VStack>
  );
};
