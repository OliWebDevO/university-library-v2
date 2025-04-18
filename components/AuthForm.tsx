'use client';
import { zodResolver } from "@hookform/resolvers/zod"
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from "react-hook-form"

import React from 'react'
import { ZodType } from "zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import FileUpload from "./FileUpload";

interface Props<T extends FieldValues> {
    schema: ZodType<T>;
    defaultValues: T;
    onSubmit: (Data:T) => Promise<{success: boolean, error?: string}>;
    type: 'SIGN_IN' | 'SIGN_UP';
}

const AuthForm = <T extends FieldValues> ({
    type, 
    schema, 
    defaultValues, 
    onSubmit,
    } : Props<T>) => {

    const rooter = useRouter();

    const isSignIn = type === 'SIGN_IN';

    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>
      })
     
      // 2. Define a submit handler
        const handleSubmit: SubmitHandler<T> = async (data) => {
            const result = await onSubmit(data);
            if(result.success) {
                toast({
                    title: "Success",
                    description: isSignIn 
                    ? 'You have successfully signed in'
                    : 'You have successfully signed up',
                });
                rooter.push('/')
            } else {
                toast({
                    title: `Error ${isSignIn ? 'signing in' : 'signing up'}`,
                    description: result.error ?? 'An error occurred.',
                    variant: 'destructive',
                })
            }
        };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold text-white ">{isSignIn ? 'Welcome back to BookWise' : 'Create your account'}</h1>
            <p className="text-light-100">
                {isSignIn ? 'Acces the vast collection of ressources, and stay updated' : 'Please complete all fields and upload a valid university card to access the platform'}
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
                {Object.keys(defaultValues).map((field) => (
                    <FormField
                    key={field}
                    control={form.control}
                    name={field as Path<T>}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel className="capitalize">{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
                        <FormControl>
                            {field.name === 'universityCard'? (
                                <FileUpload 
                                    type="image" 
                                    accept="image/*" 
                                    placeholder="Upload your ID"
                                    folder="ids"
                                    variant="dark"
                                    onFileChange={field.onChange}
                                    /> 
                                ): (
                                    <Input 
                                    required type = {
                                        FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                                    } 
                                    {...field}
                                    className="form-input"
                                    placeholder= {'Write your ' + FIELD_NAMES[field.name as keyof typeof FIELD_NAMES] + ' here'}
                                     />
                                ) }
                            
                        </FormControl>
                        {/* <FormDescription>
                            This is your public display name.
                        </FormDescription> */}
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                ))}
                <Button type="submit" className="form-btn">{isSignIn? 'Sign In' : 'Sign Up'}</Button>
              </form>
            </Form>
            <p className="text-center text-base font-medium">
                {isSignIn ? 'New to BookWise? ' : 'Already have an account? '}
                <Link className="font-bold text-primary" href={isSignIn ? '/sign-up' : '/sign-in'}>
                    {isSignIn ? 'Sign up' : 'Sign in'}
                </Link>
            </p>
        </div>
      );
}

export default AuthForm