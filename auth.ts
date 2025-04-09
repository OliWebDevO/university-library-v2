import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "./database/drizzle";
import { eq } from "drizzle-orm";
import { users } from "./database/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        strategy: "jwt", // Use JWT for session management
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // Fetch the user from the database
                const user = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, credentials.email.toString()))
                    .limit(1);

                if (user.length === 0) return null;

                // Verify the password
                const isPasswordValid = await compare(
                    credentials.password.toString(),
                    user[0].password
                );
                if (!isPasswordValid) return null;

                // Return the user object with the required fields
                return {
                    id: user[0].id.toString(),
                    email: user[0].email,
                    name: user[0].fullName,
                } as User;
            },
        }),
    ],
    pages: {
        signIn: "/sign-in", // Custom sign-in page
    },
    callbacks: {
        // Add the user ID to the JWT token
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; // Add the user ID to the token
                token.name = user.name; // Add the user's name to the token
            }
            return token;
        },
        // Add the user ID to the session object
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string; // Add the user ID to the session
                session.user.name = token.name as string; // Add the user's name to the session
            }
            return session;
        },
    },
});