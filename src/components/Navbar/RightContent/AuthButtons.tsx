import { authModelState } from "@/atoms/authModalAtoms";
import { useSetRecoilState } from "recoil";
import { Button } from "@chakra-ui/react";
import React from "react";

const AuthButtons: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModelState);
  return (
    <>
      <Button
        variant={"outline"}
        height={"25px"}
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: "login" })}
      >
        Log In
      </Button>
      <Button
        height={"25px"}
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => setAuthModalState({ open: true, view: "signup" })}
      >
        Sign Up
      </Button>
    </>
  );
};
export default AuthButtons;
