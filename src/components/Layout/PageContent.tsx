import { Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = {
  children: React.ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <Flex>
      <Flex>
        {/* left side */}
        <Flex>{children && children[0 as keyof typeof children]}</Flex>
        {/* right side */}
        <Flex>{children && children[1 as keyof typeof children]}</Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
