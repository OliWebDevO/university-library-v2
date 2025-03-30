import {Client as WorkflowClient} from '@upstash/workflow';
import config from './config';
import { Client as QStachClient, resend } from "@upstash/qstash";
export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken,
});


const qstachClient = new QStachClient({ token: config.env.upstash.qstashToken });

export const sendEmail = async ({message, email, subject} : {message: string; email: string; subject: string;}) => {

    await qstachClient.publishJSON({
        api: {
          name: "email",
          provider: resend({ token: config.env.resendToken }),
        },
        body: {
          from: "Oliver <contact@testopia.pro>",
          to: [email],
          subject: subject,
          html: message,
          // react: Email(),
        },
      });
}

