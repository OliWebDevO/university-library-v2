import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs"
import { eq } from "drizzle-orm";
import { Button, Html, Section, Img, Text, Heading } from "@react-email/components";
import * as React from "react";
type UserState = "non-active" | "active";

type InitialData = {
  email: string
  fullName: string
}

const ONE_DAY_IN_MS = 60 * 60 * 24 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email:string): Promise<UserState> => {
const user = await db
    .select()
    .from(users)
    .where(eq(users.email,email))
    .limit(1);

    if (user.length === 0) { return "non-active" }

    const lastActivityDate = new Date(user[0].lastActivityDate!);
    const now = new Date();
    const timeDifference = now.getTime() - lastActivityDate.getTime();

    if (timeDifference > THIRTY_DAYS_IN_MS && timeDifference <= THREE_DAYS_IN_MS) {
      return "non-active";
    } else {
      return "active";
    }
}

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload

  // Welcome email
  await context.run("new-signup", async () => {
    // await sendEmail({email, subject: "Welcome to the platform", message: `Hello ${fullName}, welcome to our platform!`})
    await sendEmail({email, subject: "Welcome to the platform", message: `<Html>
        <Section style={{ marginTop: 16, marginBottom: 16 }}>
          <Img
            alt="Herman Miller Chair"
            height="320"
            src="https://react.email/static/herman-miller-chair.jpg"
            style={{
              width: 100%;
              border-radius: 12;
              object-fit: 'cover';
            }}
          />
          <Section
            style={{
              margin-top: 32;
              text-align: 'center';
            }}
          >
            <Text
              style={{
                margin-top: 16;
                margin-bottom: 16;
                font-size: 18;
                line-height: 28ppx;
                font-weight: 600;
                color: rgb(79,70,229);
              }}
            >
              We are thrilled to have you here !
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
              Welcome to our library  !
            </Heading>
            <Text
              style={{ fontSize: 16, lineHeight: '24px', color: 'rgb(107,114,128)' }}
            >
             You are now a member of our platform ! You can reset your credential, move your books around, and never miss a beat !
            </Text>
            <button
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
            </button>
          </Section>
        </Section>
      </Html>`})
    // await sendEmail({email, subject: "Welcome to the platform", message: `${Email()}`})
  })

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3)

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email)
    })

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
            email,
            subject: "We miss you!",
            message: `Hello ${fullName}, we noticed you haven't been active for a while. We miss you !`,
        })
      })
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
            email,
            subject: "Thank you for being there!",
            message: `Hello ${fullName}, thank you for being there with us !`,
        })
      })
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30)
  }
})


