import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

const OAtuhButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <Flex direction={"column"} width={"100%"} mb={4}>
      <Button
        variant={"oauth"}
        mb={2}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image src="images/googlelogo.png" height={"20px"} mr={4} />
        Continue with Google
      </Button>
      {error && (
        <Text textAlign={"center"} fontSize={"10pt"} color={"red"}>
          {error.message}
        </Text>
      )}
    </Flex>
  );
};
export default OAtuhButtons;
