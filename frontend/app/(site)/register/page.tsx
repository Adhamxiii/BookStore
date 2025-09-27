import { NextPage } from 'next'
import React from 'react'
import FormRegister from './_components/FormRegister';

const RegisterPage: NextPage = () => {
  return (
    <div className="h-calc(100vh-64px) container mx-auto flex items-center justify-center px-4 pt-28 pb-8">
      <FormRegister />
    </div>
  )
}

export default RegisterPage;
