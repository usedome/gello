import { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Flex, Image, Box, Text } from "@chakra-ui/react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Footer, Loader } from "../";
import { useVerifyGoogleAuth } from "../../store";
import { ResetPassword } from "./ResetPassword";
import { ChangeAuth } from "./ChangeAuth";
import { GuestGuardedRoute } from "../../App";

export const Auth = () => {
  const verifyGoogleAuth = useVerifyGoogleAuth();
  const code = new URLSearchParams(window.location.search).get("code");
  const location = useLocation();

  useEffect(() => {
    if (code) verifyGoogleAuth();
  }, []);

  if (code) return <Loader />;

  if (location.pathname.includes("/auth/change")) return <ChangeAuth />;

  return (
    <Box overflowX="hidden" minH="100vh">
      <Flex
        w={{ base: "100vw", md: "102vw" }}
        direction={{ base: "column", md: "row" }}
        minH={{ base: "96.5vh", sm: "91vh" }}
        justify="center"
        align="center"
        bg="ivory"
        pos="relative"
        left={{ md: "-2vw" }}
      >
        <Box
          w="17rem"
          pos="relative"
          top={{ md: "-3vh" }}
          mb={{ base: 6, sm: 8, md: 0 }}
        >
          <Text
            fontFamily="oswald"
            fontSize="2xl"
            textAlign={{ base: "center", md: "left" }}
          >
            DOME
          </Text>
        </Box>
        <Switch>
          <Route path="/password/reset/:token">
            <ResetPassword />
          </Route>
          <GuestGuardedRoute path="/session/new">
            <Login />
          </GuestGuardedRoute>
          <GuestGuardedRoute path="/accounts/new">
            <Signup />
          </GuestGuardedRoute>
        </Switch>
      </Flex>
      <Footer />
    </Box>
  );
};
