import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { Code } from "./Code";

const scopes = [
  {
    label: "openid",
    isRequired: true,
  },
  {
    label: "email",
    isRequired: false,
  },
  {
    label: "profile_pic",
    isRequired: false,
  },
  {
    label: "student",
    isRequired: false,
  },
  {
    label: "educations",
    isRequired: false,
  },
  {
    label: "fullname",
    isRequired: false,
  },
  {
    label: "account_type",
    isRequired: false,
  },
];

interface OAuthProps {
  data: ExchangeResponse | null;
}

export const OAuth: FC<OAuthProps> = (props) => {
  const router = useRouter();
  const [selectedScope, setSelectedScope] = useState<string[]>(["openid"]);
  const boxBorderColor = useColorModeValue("gray.300", "gray.800");
  function appendScope(scope: string) {
    setSelectedScope([...selectedScope, scope]);
  }
  function removeScope(scope: string) {
    const filtered = selectedScope.filter((s) => {
      return s !== scope;
    });
    setSelectedScope([...filtered]);
  }

  function getOpenIDConnect() {
    const openidBase64 = props.data?.payload.id_token.split(".")[1];
    if (!openidBase64) return "";
    const buff = Buffer.from(openidBase64, "base64");
    const obj = JSON.parse(buff.toString("utf-8"));
    return JSON.stringify(obj, null, 2);
  }

  const getSigninUrl = () => {
    return `${process.env.NEXT_PUBLIC_OAUTH_HOST}/signin?client_id=${
      process.env.NEXT_PUBLIC_CLIENT_ID
    }&scope=${selectedScope.join("%20")}&response_type=code&redirect_uri=${
      process.env.NEXT_PUBLIC_REDIRECT_URI
    }`;
  };

  return (
    <>
      {props.data === null ? (
        !router.query.code ? null : (
          // Error on exchanging authorization code
          <Alert status="error" variant="left-accent" my={4}>
            <AlertIcon />
            Sign in failed: Code exchange is not authorized! Please try again.
          </Alert>
        )
      ) : (
        <>
          <Flex justifyContent="end" mb={2}>
            <Button size="sm" rounded="full" onClick={() => router.push("/")}>
              ปิดผลลัพธ์
            </Button>
          </Flex>
          <Box py={6} bg="white" rounded={10} mb={4}>
            <Box px={4} mb={4}>
              <Heading size="sm">Authorization code exchange result</Heading>
            </Box>
            <Divider />
            <Box px={4} mb={4}>
              <Code language="json">{JSON.stringify(props.data, null, 2)}</Code>
            </Box>
          </Box>
          <Box py={6} bg="white" rounded={10} mb={4}>
            <Box px={4} mb={4}>
              <Heading size="sm">OpenID Connect</Heading>
              <Text fontSize={12} mt={2}>
                Decoded from ID Token (id_token) JWT.
              </Text>
            </Box>
            <Divider />
            <Box px={4} mb={4}>
              <Code language="json">{getOpenIDConnect()}</Code>
            </Box>
          </Box>
        </>
      )}
      <Box bg="white" rounded={10}>
        <Box p={6}>
          <Heading size="md" mb={2}>
            รายละเอียดการเข้าสู่ระบบ
          </Heading>
          <Text mb={5} opacity={0.7} fontSize={18}>
            การทดลองเข้าสู่ระบบครั้งนี้จะทำให้แอปพลิเคชันสามารถเข้าถึงข้อมูลส่วนตัวของคุณได้
            เลือกข้อมูลที่คุณต้องการดูและลอง Sign in with Kasetsart
            ด้านล่างได้เลย
          </Text>
          <Stack spacing={[1, 5]} direction="column">
            {scopes.map((s, index) => {
              return (
                <Checkbox
                  key={`scope-${index}-mapped`}
                  size="md"
                  isChecked={selectedScope.includes(s.label)}
                  colorScheme="katrade"
                  defaultChecked={s.isRequired}
                  onChange={(e) => {
                    if (s.isRequired) {
                      return alert(`${s.label} is required by OAuth server.`);
                    } else {
                      e.target.checked
                        ? appendScope(s.label)
                        : removeScope(s.label);
                    }
                  }}
                >
                  {s.label}
                </Checkbox>
              );
            })}
          </Stack>
          <Box
            my={6}
            bgColor={useColorModeValue("gray.100", "gray.800")}
            px={4}
            py={6}
            rounded={8}
            fontSize={12}
            fontWeight={600}
            fontFamily={`"Roboto Mono", monospace`}
          >
            {`https://app.kraikub.com/signin?client_id=${"<your-client-id>"}&scope=${selectedScope.join(
              "%20"
            )}&redirect_uri=<your-server-url>`}
          </Box>
        </Box>
        <Box p={4}>
          <Link href={getSigninUrl()}>
            <a>
              <Button
                size="lg"
                color="mongo.lime"
                bg="mongo.blue"
                w="full"
                height="80px"
                fontSize={18}
                fontWeight={600}
                fontFamily={`Inter, Helvetica, sans-serif;`}
                letterSpacing="-0.03em"
                rounded={16}
                _hover={{
                  bg: "mongo.blueLight",
                }}
                _active={{
                  bg: "mongo.blueLight",
                }}
              >
                Sign in with Kasetsart
              </Button>
            </a>
          </Link>
        </Box>
      </Box>
    </>
  );
};
