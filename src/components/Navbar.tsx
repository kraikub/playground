import { Box, Button, ButtonGroup, Container, Heading, HStack, IconButton, useColorMode } from "@chakra-ui/react";
import { BiMoon, BiSun } from "react-icons/bi";
import { FC } from "react";

export const Navbar: FC = () => {
  const { toggleColorMode, colorMode } = useColorMode()
  return (
    <Box boxShadow="0 2px 3px 3px #00000010">
      <Container
        maxW="container.xl"
        h="60px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Heading size="sm" fontWeight={700}>
            KRAIKUB{" "}
            <Box as="span" fontWeight={400} opacity={0.8}>
              PLAYGROUND
            </Box>
          </Heading>
        </Box>
        <ButtonGroup>
        <IconButton aria-label="toggle-theme" onClick={toggleColorMode} variant="ghost" fontSize={24}>
          {
            colorMode === "light" ? <BiMoon /> : <BiSun />
          }
          
          </IconButton>
          <a href="https://kraikub.com">
            <Button colorScheme="messenger" fontSize={14} fontWeight={700}>TRY NOW</Button>
          </a>

        </ButtonGroup>
      </Container>
    </Box>
  );
};
