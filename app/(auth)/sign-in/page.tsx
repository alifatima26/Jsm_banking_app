import AuthForm from '@/components/AuthForm'
import React from 'react'

//typically both are server side 
const SignIn = () => {
  return (
    <section className='flex-center size-full max-sm:px-6'>
      <AuthForm type='sign-in'/>
      </section>
  )
}

export default SignIn