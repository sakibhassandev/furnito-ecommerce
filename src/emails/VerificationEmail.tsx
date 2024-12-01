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
  otp: string;
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
      <Preview>Here&apos;s your verification code ${otp}</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hey {name},</Heading>
          <Text>
            Thank you for registering. Please use the following verification
            code to confirm your account. This code will be valid only for 3
            hours.
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
          <Text>Best, Furnito Team</Text>
        </Row>
        <Row>
          <Button
            href={`http://localhost:3000/verify/${email}`} //Todo: Change this with the actual URL
            style={{ color: "white", backgroundColor: "#B88E2F" }}
          >
            Verify here
          </Button>
        </Row>
      </Section>
    </Html>
  );
}
