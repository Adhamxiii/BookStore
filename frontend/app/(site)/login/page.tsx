import { NextPage } from "next";
import React from "react";
import FormLogin from "./_components/FormLogin";

const LoginPage: NextPage = () => {
  return (
    <div className="h-screen container mx-auto flex items-center justify-center">
      <FormLogin />
    </div>
  );
};

export default LoginPage;
