'use client';
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'

import { z } from "zod"  //zod is a form validation tool
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/actions/user.actions';



const AuthForm = ({type} : {type: string}) => {

    const router = useRouter()

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    const formSchema = authFormSchema(type)

     // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",   //field form contains
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log('Submitting form with values:', data);
    setIsLoading(true);
    try {
        //signup with Appwrite & create Plaid token
            if(type === 'sign-up'){
                //create userData to pass it in Appwrite and Plaid
                //complete the auth in signUp
                const newUser = await signUp(data)
                setUser(newUser)
            }


            if(type === 'sign-in')
                {
                const response = await signIn({
                    email: data.email,
                    password: data.password,
                })
                //after response navigate to HOME page
                    if(response) router.push('/')
            }

    } catch (error) {
      console.error('Error submitting form:', error);

      //stop the loading 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
        <Link href='/' className='flex cursor-pointer items-center gap-1 px-4'>
            <Image src='/icons/logo.svg' width={34} height={34} alt='Horizon logo'/>
            <h1 className='text-26 font-bold text-black-1 font-ibm-plex-serif'>Horizon</h1>
            </Link>

            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {/**here link the account if find user and check type also */}
                    {user
                    ? 'Link Account'
                    :type === 'sign-in'?
                    'Sign In' : 'Sign Up' }

                    <p className='text-16 font-normal text-gray-600'>
                        {user ? 
                        'Link your account to get started'
                    : 'Please enter your details'}

                    </p>

                </h1>
            </div>
        </header>

        {user ? (
            <div className='flex flex-col gap-4'>
                {/**Plaid Link */}
            </div>

        ): (
            <>
            {/**using react-hook-form shadcn FORM */}
            <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {/**add condition for signup fields */}

            {type === 'sign-up' && (
                <>
                <div className='flex gap-4'>
                <CustomInput control={form.control} name='firstName' 
                label='First Name' 
                placeholder='Enter your first name' 
                id='firstName' // Pass unique id
                />
                 <CustomInput control={form.control} name='lastName' 
                label='Last Name' 
                placeholder='Enter your last name' 
                id='lastName' // Pass unique id
                />
                </div>
              
                <CustomInput control={form.control} name='address1' 
                label='Address' 
                placeholder='Enter your specific address' 
                id='address1' // Pass unique id
                />

                <CustomInput control={form.control} name='city' 
                label='City' 
                placeholder='Enter your city' 
                id='city' // Pass unique id
                />
                <div className='flex gap-4'>
                <CustomInput control={form.control} name='state' 
                label='State' 
                placeholder='Example: NY' 
                id='state' // Pass unique id
                />
                <CustomInput control={form.control} name='postalCode' 
                label='Postal Code' 
                placeholder='Example: 11011' 
                id='postalCode' // Pass unique id
                />
                </div>
                <div className='flex gap-4'>
                <CustomInput control={form.control} name='dateOfBirth' 
                label='Date of Birth' 
                placeholder='YYYY-MM-DD' 
                id='dateOfBirth' // Pass unique id
                />
                <CustomInput control={form.control} name='ssn' 
                label='SSN' 
                placeholder='Example: 1234' 
                id='ssn' // Pass unique id
                />
                </div>
                </>
            )}

                {/**add CustomInput component here */}
                <CustomInput control={form.control} name='email' 
                label='Email' 
                placeholder='Enter your email' 
                id='email' // Pass unique id
                />


                <CustomInput control={form.control} 
                name='password'
                 label='Password' 
                placeholder='Enter your password'
                 id='password' // Pass unique id
                />

            <div className='flex flex-col gap-4'>
            <Button type="submit" className='form-btn' disabled={isLoading}> 
            {isLoading ? (
            <>
            <Loader2 size={20} className='animate-spin'/>
            &nbsp; Loading...
            </>
        ): type === 'sign-in'? 'Sign In' : 'Sign Up'}
            </Button>
            </div>
        
      </form>
    </Form>

            {/**add footer below form here */}
            <footer className='flex justify-center gap-1'>
                <p className='text-14 font-normal text-gray-600'>
                    {type === 'sign-in' ?
                    "Don't have an account?"
                      :"Already have an account?" }
                </p>
                {/**we can signup on signup and signin link */}
                <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                {/**add label here */}
                {type === 'sign-in' ? 'Register' : 'Login'}
                </Link>
            </footer>

            </>
        )}
    </section>
  )
}

export default AuthForm