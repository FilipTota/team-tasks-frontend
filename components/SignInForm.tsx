"use client";

import React from "react";
import Input from "./Input";
import Button from "./Button";
import Link from "next/link";

const SignInForm = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg bg-white w-[100%] max-w-[300px]">
        <h1 className="text-center">Sign In</h1>
        <form className="flex flex-col gap-3">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
          <div className="flex justify-center">
            <Button text="Sign In" />
          </div>
          <div className="text-sm text-red-500">Error message</div>
          <div className="flex justify-center text-sm">
            Don&apos;t have an account?
            <Link href="/register" className="ml-1">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
