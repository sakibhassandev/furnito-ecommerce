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

interface VerificationEmailProps {
  name: string;
  otp: number;
  email: string;
}

export default function VerificationEmail({
  name,
  otp,
  email,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Furnito | Verification Code</title>
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
      <Preview>Here&apos;s your verification code {otp.toString()}</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hey {name},</Heading>
          <Text>
            Thank you for joining us. Please use the following verification code
            to confirm your account. This code will be valid only for 3 hours.
          </Text>
        </Row>
        <Row>
          <Text>{otp}</Text>
        </Row>
        <Row>
          <Text>
            If you have any questions, simply reply to this email. I’m here to
            help.
          </Text>
        </Row>
        <Row>
          <Text>Best regards, Furnito Team</Text>
        </Row>
        <Row>
          <Button
            href={`http://localhost:3000/verify?email=${email}`} //Todo: Change this with the actual URL
            style={{
              color: "white",
              backgroundColor: "#B88E2F",
              padding: "10px 22px",
              borderRadius: "5px",
            }}
          >
            Verify here
          </Button>
        </Row>
        <Row>
          <Text>
            If you did not request a verification code, please ignore this email
            or contact support if you have questions.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
