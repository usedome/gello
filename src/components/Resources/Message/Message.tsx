import { useContext, useMemo } from "react";
import { Flex, VStack, Image, Heading, Text, Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { EditResource } from "../..";
import { AppContext } from "../../../contexts";
import { TService } from "../../../store";
import { capitalize } from "../../../utilities";

export const ResourceMessage = () => {
  const [{ me }] = useContext(AppContext);

  const defaultService: TService = useMemo(() => {
    return (me?.services ?? []).find(
      (service) => service._id.toString() === (me?.default_service as string)
    ) as TService;
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      w="100%"
      h="calc(100vh - 190px)"
      dir="column"
      align="center"
      justify="center"
    >
      <VStack
        spacing={5}
        w={{ base: "85%", sm: "50%" }}
        pos="relative"
        top="-6.5%"
      >
        <Image
          boxSize={32}
          src="https://res.cloudinary.com/olamileke/image/upload/v1664228275/backmeup/assets/states/sammy-1_vbrguh.png"
          objectFit="contain"
          pos="relative"
          top="30px"
        />
        <Heading
          fontFamily="openSans"
          fontSize={{ base: "1.2rem", sm: "1.35rem" }}
          textTransform="capitalize"
          textAlign="center"
        >
          No resources exist for{" "}
          {capitalize(defaultService ? defaultService.name : "")}
        </Heading>
        <Text fontSize={"md"} textAlign="center" lineHeight="tall">
          Create your first resource by clicking the button below.
        </Text>
        <Button variant="primary" onClick={onOpen}>
          Create Resource
        </Button>
      </VStack>
      <EditResource isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};
