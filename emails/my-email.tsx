import { Button, Html, Section, Img, Text, Heading } from "@react-email/components";
import * as React from "react";

export default function Email({fullName}:{fullName: string}) {
  return (
  <Html>
    <Section style={{ marginTop: 16, marginBottom: 16 }}>
      <Img
        alt="Herman Miller Chair"
        height="320"
        src="https://react.email/static/herman-miller-chair.jpg"
        style={{
          width: '100%',
          borderRadius: 12,
          objectFit: 'cover',
        }}
      />
      <Section
        style={{
          marginTop: 32,
          textAlign: 'center',
        }}
      >
        <Text
          style={{
            marginTop: 16,
            marginBottom: 16,
            fontSize: 18,
            lineHeight: '28px',
            fontWeight: 600,
            color: 'rgb(79,70,229)',
          }}
        >
          We are thrilled to have you here {fullName} !
        </Text>
        <Heading
          as="h1"
          style={{
            margin: '0px',
            marginTop: 8,
            fontSize: 36,
            lineHeight: '36px',
            fontWeight: 600,
            color: 'rgb(17,24,39)',
          }}
        >
          Welcome to our library {fullName} !
        </Heading>
        <Text
          style={{ fontSize: 16, lineHeight: '24px', color: 'rgb(107,114,128)' }}
        >
        {fullName} You are now a member of our platform ! You can reset your credential, move your books around, and never miss a beat !
        </Text>
        <Button
          href="https://react.email"
          style={{
            marginTop: 16,
            borderRadius: 8,
            backgroundColor: 'rgb(79,70,229)',
            paddingLeft: 40,
            paddingRight: 40,
            paddingTop: 12,
            paddingBottom: 12,
            fontWeight: 600,
            color: 'rgb(255,255,255)',
          }}
        >
          Visit Our Platform
        </Button>
      </Section>
    </Section>
  </Html>
  );
}