import { useEffect, useContext, useMemo, Dispatch } from "react";
import {
  Box,
  Flex,
  VStack,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Form } from "../..";
import { useFormConfig, useGeneralControls } from "./controls";
import { AppContext, TAppState } from "../../../contexts";
import { TAppAction, TService } from "../../../store";
import { capitalize } from "../../../utilities";
import { DeleteService } from "../DeleteService";

export const General = () => {
  const [{ me, networkOperation, browserWidth }] =
    useContext<[TAppState, Dispatch<TAppAction>]>(AppContext);

  const defaultService = useMemo(() => {
    return ((me?.services as TService[]) ?? []).find(
      (service) => service._id === (me?.default_service as string)
    ) as TService;
  }, [me?.default_service]);

  const getFormConfig = useFormConfig();
  const getControls = useGeneralControls();
  const formik = useFormik(getFormConfig());
  const controls = getControls(formik);
  const { onOpen, onClose, isOpen } = useDisclosure();

  useEffect(() => {
    if (!defaultService) return;
    formik.setFieldValue("name", defaultService.name);
    formik.setFieldValue("description", defaultService.description);
    formik.setFieldValue("backup_duration", defaultService.backup_duration);
  }, [defaultService?._id]);

  return (
    <VStack spacing="24px">
      <Box
        w="100%"
        bgColor="white"
        boxShadow="sm"
        p={{ base: 6, sm: 8, md: 10 }}
      >
        <Form
          controls={controls}
          onSubmit={formik.handleSubmit}
          networkOperation="update.service"
          submitBtnText={
            (networkOperation === "update.service" ? "Updating " : "Update ") +
            formik.values.name
          }
        />
      </Box>
      <Flex
        w="100%"
        bgColor="white"
        boxShadow="sm"
        p={{ base: 6, sm: 8, md: 10 }}
        direction={["column", "row"]}
        justify="space-between"
        align={["flex-start", "center"]}
      >
        <Box
          w={{ base: "100%", sm: "70%", md: "60%" }}
          mb={[4, 0]}
          textAlign="left"
        >
          <Text
            fontWeight="600"
            fontSize={{ base: "0.95rem", sm: "md" }}
            mb={2}
          >
            Delete {capitalize(defaultService?.name ?? "")}
          </Text>
          <Text
            lineHeight={["tall", "unset"]}
            fontSize={{ base: "0.9rem", sm: "0.98rem" }}
          >
            Doing this will delete all its associated resources along with their
            backups. Please be certain.
          </Text>
        </Box>
        <Button
          variant="danger"
          w={["100%", "fit-content"]}
          onClick={onOpen}
          size={browserWidth && browserWidth > 480 ? "md" : "sm"}
        >
          Delete
        </Button>
      </Flex>
      <DeleteService isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};
