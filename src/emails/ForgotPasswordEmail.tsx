import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface ForgotPasswordEmailProps {
  name: string;
  token: string;
}

export default function ForgotPasswordEmail({
  name,
  token,
}: ForgotPasswordEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Furnito | Forgot Password</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Reset your password</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {name},</Heading>
          <Text>
            We received a request to reset your password. Click the button below
            to reset your password. This link will expire in 3 hours.
          </Text>
        </Row>
        <Row>
          <Button
            href={`${process.env.SITE_URL}/reset-password?token=${token}`}
            style={{
              color: "white",
              backgroundColor: "#B88E2F",
              padding: "10px 22px",
              borderRadius: "5px",
            }}
          >
            Reset Password
          </Button>
        </Row>
        <Row>
          <Text>
            If you did not request a password reset, please ignore this email or
            contact support if you have questions.
          </Text>
        </Row>
        <Row>
          <Text>Best regards, Furnito Team</Text>
        </Row>
      </Section>
    </Html>
  );
}
