"use client";

import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
    setError("");
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError("");
    setError("");
  };

  const validateForm = () => {
    let isValid = true;

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[0-9])/;
    if (!passwordRegex.test(password)) {
      setPasswordError("Password must contain at least one number");
      isValid = false;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
      const requestBody = {
        email,
        password,
      };

      const response = await fetch("/api/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (response.ok) {
        setError("");

        // store the JWT and refreshToken in cookies
        if (result) {
          Cookies.set("accessToken", result.accessToken);
          Cookies.set("refreshToken", result.refreshToken);
        }
        // redirect to /dashboard
        router.push("/dashboard");
      } else {
        setError(result.message || "An error occurred");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg bg-white w-[100%] max-w-[300px]">
        <h1 className="text-center">Sign In</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          />
          {emailError && (
            <div className="text-sm text-red-500 mt-[-0.5em]">{emailError}</div>
          )}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
          {passwordError && (
            <div className="text-sm text-red-500 mt-[-0.5em]">
              {passwordError}
            </div>
          )}
          <div className="flex justify-center">
            <Button text="Sign In" type="submit" />
          </div>
          <div className="text-sm text-red-500 text-center">{error}</div>
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
