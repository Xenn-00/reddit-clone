import { authModelState } from "@/atoms/authModalAtoms";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

const SignUp: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModelState);

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onSubmit = () => {};

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSignUpForm((prev) => ({
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
      <Input
        name="confirmPassword"
        placeholder="Confirm Password"
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
        Sign Up
      </Button>

      <Flex fontSize={"9pt"} justifyContent={"center"}>
        <Text mr={1}>Already a redditor ? </Text>
        <Text
          color={"blue.500"}
          fontWeight={700}
          cursor={"pointer"}
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        >
          Log in
        </Text>
      </Flex>
    </form>
  );
};
export default SignUp;
