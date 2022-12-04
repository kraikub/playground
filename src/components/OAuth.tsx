import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
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
    label: "university_email",
    isRequired: false,
  },
  {
    label: "personal_email",
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
    return `https://app.kraikub.com/signin?client_id=${
      process.env.NEXT_PUBLIC_CLIENT_ID
    }&scope=${selectedScope.join(
      "%20"
    )}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}`;
  };

  return (
    <>
      {props.data === null ? (
        !router.query.code ? null : (
          // Error on exchanging authorization code
          <Alert status="error" variant="left-accent" my={4}>
            <AlertIcon />
            Sign in failed: Code exchange is not authorized!
          </Alert>
        )
      ) : (
        <>
          <Box
            py={6}
            borderStyle="solid"
            borderColor={boxBorderColor}
            borderWidth="1px"
            rounded={10}
            mb={4}
          >
            <Box px={4} mb={4}>
              <Heading size="sm">Authorization code exchange result</Heading>
            </Box>
            <Divider />
            <Box px={4} mb={4}>
              <Code language="json">{JSON.stringify(props.data, null, 2)}</Code>
            </Box>
          </Box>
          <Box
            py={6}
            borderStyle="solid"
            borderColor={boxBorderColor}
            borderWidth="1px"
            rounded={10}
            mb={4}
          >
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
      <Box
        py={8}
        borderStyle="solid"
        borderColor={boxBorderColor}
        borderWidth="1px"
        rounded={10}
      >
        <Box display="flex" justifyContent="center" alignItems="center" mb={8}>
          <Link href={getSigninUrl()}>
            <a>
              <Button size="lg" colorScheme="messenger">
                Sign in with KU
              </Button>
            </a>
          </Link>
        </Box>
        <Divider />
        <Container maxW="600px" mt={4} py={4}>
          <Heading size="md" mb={5}>
            Choose sign in scope(s)
          </Heading>
          <Text mb={5}>
            Sign in scope(s) tells Kraikub which data topic you need to claim
            from your users.
          </Text>
          <Stack spacing={[1, 5]} direction="column">
            {scopes.map((s, index) => {
              return (
                <Checkbox
                  key={`scope-${index}-mapped`}
                  size="md"
                  isChecked={selectedScope.includes(s.label)}
                  colorScheme="messenger"
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
          >
            {`https://app.kraikub.com/signin?client_id=${"<your-client-id>"}&scope=${selectedScope.join(
              "%20"
            )}&redirect_uri=<your-server-url>`}
          </Box>
          <Text>
            And now click at Sign in with KU Button above and see the result.
          </Text>
        </Container>
      </Box>
    </>
  );
};
