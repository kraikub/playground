import { Box, Center, Text } from "@chakra-ui/react";
import Link from "next/link";

export const Footer = () => {
  return (
    <Box
      bg="#121212"
      color="white"
      py="40px"
      fontFamily={`"Inter", Helvetica, sans-serif`}
    >
      <Center h="100px">
        <Box textAlign="center">
          <Text opacity={0.6} fontSize={14} mb={2}>
            For more information, please visit{" "}
            <Link href="https://kraikub.com">kraikub.com</Link>
          </Text>
          <Text opacity={0.6} fontSize={10}>
            Copyright © 2023 Nutchanon Chantrasup. All rights reserved.
          </Text>
        </Box>
      </Center>
    </Box>
  );
};
