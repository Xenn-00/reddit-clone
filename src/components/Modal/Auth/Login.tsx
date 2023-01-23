import { authModelState } from "@/atoms/authModalAtoms";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModelState);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const onSubmit = () => {};

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        name="email"
        placeholder="Email"
        _placeholder={{ color: "gray.500" }}
        type="email"
        mb={2}
        onChange={onChange}
        border={"1px solid gray"}
        _hover={{
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        fontSize={"10pt"}
        required
      />
      <Input
        name="password"
        placeholder="Password"
        _placeholder={{ color: "gray.500" }}
        type="password"
        mb={2}
        onChange={onChange}
        border={"1px solid gray"}
        _hover={{
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        fontSize={"10pt"}
        required
      />
      <Button type="submit" width={"100%"} height={"36px"} mt={2} mb={2}>
        Log In
      </Button>

      <Flex fontSize={"9pt"} justifyContent={"center"}>
        <Text mr={1}>New Here ?</Text>
        <Text
          color={"blue.500"}
          fontWeight={700}
          cursor={"pointer"}
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
        >
          Sign Up
        </Text>
      </Flex>
    </form>
  );
};
export default Login;
