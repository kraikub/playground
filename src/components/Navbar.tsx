import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Heading,
  HStack,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { BiMoon, BiSun } from "react-icons/bi";
import { FC } from "react";

export const Navbar: FC = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <Box color="white">
      <Container
        maxW="container.xl"
        h="60px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Heading size="sm">
            <Box
              as="span"
              fontFamily={`"Inter", Helvetica, sans-serif`}
              letterSpacing={"-0.03em"}
              fontWeight={700}
            >
              KRAIKUB
            </Box>{" "}
            {"(ใครคับ)"}
          </Heading>
        </Box>
        <ButtonGroup></ButtonGroup>
      </Container>
    </Box>
  );
};
