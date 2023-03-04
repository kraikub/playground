import {
  Box,
  Button,
  ButtonGroup,
  Code,
  Container,
  Grid,
  GridItem,
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
      <Box
        bg="linear-gradient(169deg, rgba(0,30,43,1) 57%, rgba(0,0,0,1) 100%)"
        minH="100vh"
        color="white"
      >
        <Container maxW="1800px" py="50px">
          <Grid templateColumns="repeat(12, 1fr)" columnGap={5} rowGap={8}>
            <GridItem colSpan={[12, 5]}>
              <Heading fontWeight={600}>ทดลองใช้งานระบบยืนยันตัวตน</Heading>
              <Text fontSize={20} fontWeight={500} opacity={0.7} mt={2}>
                Sign in with Kasetsart หรือ เข้าสู่ระบบด้วยเกษตรศาสตร์
                เป็นระบบยืนยันตัวตนที่เปิดให้แอปพลิเคชันใดๆ
                สามารถยืนยันตัวตนนักศึกษามหาวิทยาลัยเกษตรศาสตร์ได้
              </Text>
              <Text fontSize={20} fontWeight={500} opacity={0.7} mt={8}>
                Sign in with Kasetsart ทำงานเหมือนกับ Sign in with Google, Sign
                in with Facebook และอื่นๆ
                ซึ่งเป็นระบบยืนยันตัวตนที่ถูกสร้างขึ้นด้วย OAuth 2.0 Protocol
              </Text>
              <ButtonGroup my={5}>
              <Button
                size="lg"
                color="mongo.blue"
                bg="mongo.lime"
                _hover={{ bg: "mongo.lime" }}
              >
                ไปที่เว็บไซต์หลัก
              </Button>
              </ButtonGroup>
            </GridItem>
            <GridItem colSpan={[12, 7]} color="black">
              <OAuth data={props.data} />
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
