'use server';

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "../ratelimite";
import { redirect } from "next/navigation";


export const signInWithCredentials = async (
    params: Pick<AuthCredentials, "email" | "password">,
) => {
    
    const { email, password } = params;

    const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';
    
    const {success} = await ratelimit.limit(ip);
    if (!success) {return redirect('/too-fast')}

    try {
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });
        if (result?.error) {
            return { 
                success: false, 
                error: result.error 
            }
        }
        return {
            success: true
        }

    } catch(error) {
        console.log(error, "Sign in failed");
        return { 
            success: false, 
            error: 'Sign in failed' 
        }
    }
};

export const signUp = async ( params : AuthCredentials) => {

    const { fullName, email, universityId, password, universityCard } = params;

    const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';

    const {success} = await ratelimit.limit(ip);
    if (!success) {return redirect('/too-fast')}

    //Check if user already exists
    const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

    if(existingUser.length > 0) {
        return { 
            success: false, 
            error: 'User already exists' 
        }
    }

    const hashedPassword = await hash(password, 10);

    try {
        await db.insert(users).values({
            fullName,
            email,
            universityId,
            password: hashedPassword,
            universityCard,
        });

        await signInWithCredentials({ email, password });

        return { 
            success: true
        }

    } catch (error) { 
        console.log(error, "Sign up failed");
        return { 
            success: false, 
            error: 'Sign up failed' 
        }
    }
};