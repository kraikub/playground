import {
  Box,
  Code,
  Container,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialOceanic } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Navbar } from "../src/components/Navbar";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { OAuth } from "../src/components/OAuth";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";

const signinQueryStringTableContent = [
  {
    key: "client_id",
    value: "string",
    description:
      "Client ID is an ID provided for any registered application. Visit app.kraikub.com and register your application to get the Client ID.",
    required: true,
  },
  {
    key: "scope",
    value: "string",
    description:
      "Scope is a set of data you want to ask for an access from each individual user that log in to your app with SIGN IN WITH KU. Example: openid%20student",
    required: true,
  },
  {
    key: "redirect_uri",
    value: "string",
    description:
      "URI for redirecting the authorization code. Example: https://example.com/callback",
    required: true,
  },
  {
    key: "state",
    value: "string",
    description: "Unique value for specify your auth request on your server.",
    required: false,
  },
];

interface Data {
  data: ExchangeResponse | null;
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (
  context
) => {
  if (!context.query.code) {
    return {
      props: {
        data: null,
      },
    };
  }
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_OAUTH_HOST}/api/oauth/v1/token`,
      {
        code: context.query.code,
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "authorization_code",
      }
    );
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        data: null,
      },
    };
  }
};

const Home: NextPage<Data> = (props) => {
  return (
    <>
      <Navbar />
      <Container maxW="container.xl" py="50px">
        <Heading size="lg">Developers Playground</Heading>
        <Text my={6}>
          Learn how to use our OAuth 2.0 Authorization Server to authenticate
          any KU students on your applications.
        </Text>
        <Box my={6}>
          <OAuth data={props.data} />
        </Box>
        <VStack alignItems="start" w="full" my="100px" spacing="50px">
          <VStack alignItems="start" spacing={6} maxW="full">
            <Heading size="md">
              Step 1: Bring your users to the sign in page.
            </Heading>
            <Text>
              Base URL for signing your users in is{" "}
              <Code>https://app.kraikub.com/signin</Code>. When users tap the{" "}
              <strong>SIGN IN WITH KU</strong> button on your web-app or
              mobile-app, your need to redirect your users to the given URL.
              There for, some parameters are required as {`"Query strings"`}.
              Query string is a key-value parameter which is provided on the
              sign in URL. An example of a query string is {`?key=value`}. Once
              you redirect your users to our sign in URL, you need to provide
              these query strings to let Kraikub OAuth 2.0 server knows how to
              interact with your sign in requests.
            </Text>
            <Box w="full">
              <TableContainer
                whiteSpace="normal"
                borderStyle="solid"
                borderWidth="1px"
                borderColor={useColorModeValue("gray.200", "gray.800")}
                rounded={8}
              >
                <Table size="lg">
                  <Thead>
                    <Tr>
                      <Th>KEY</Th>
                      <Th>VALUE</Th>
                      <Th maxWidth="400px">DESCRIPTION</Th>
                      <Th>REQUIRED</Th>
                    </Tr>
                  </Thead>
                  <Tbody fontSize={14} fontWeight={400}>
                    {signinQueryStringTableContent.map((row, index) => {
                      return (
                        <Tr key={`sign-in-query-table-${index}`}>
                          <Td>
                            <Code>{row.key}</Code>
                          </Td>
                          <Td>{row.value}</Td>
                          <Td maxWidth="400px">{row.description}</Td>
                          <Td>
                            {row.required ? (
                              <BsFillCheckCircleFill />
                            ) : (
                              "(optional)"
                            )}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </VStack>
        </VStack>
      </Container>
    </>
  );
};

export default Home;
