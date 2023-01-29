import { authModalState } from "@/atoms/authModalAtoms";
import { auth } from "@/firebase/clientApp";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { FIREBASE_ERRORS } from "@/firebase/errors";

const SignUp: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) {
      setError("");
    }
    if (signUpForm.password !== signUpForm.confirmPassword) {
      // set error
      setError("Password do not match");
      return;
    }
    // password match
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

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
      {(error || userError) && (
        <Text textAlign={"center"} fontSize={"10pt"} color={"red"}>
          {error ||
            FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
        </Text>
      )}

      <Button
        type="submit"
        width={"100%"}
        height={"36px"}
        mt={2}
        mb={2}
        isLoading={loading}
      >
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
