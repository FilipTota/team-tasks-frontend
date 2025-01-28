"use client";
import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    // reset error when user stars typing
    setUsernameError("");
    setError("");
  };

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

    // Username validation
    if (username.trim() === "") {
      setUsernameError("Username is required");
      isValid = false;
    }

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

    // Validate form before submitting
    const isFormValid = validateForm();

    if (isFormValid) {
      const data = {
        username,
        email,
        password,
      };

      try {
        const response = await fetch("/api/auth/signUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
          setError(""); // Reset error
          console.log("Sign up successful:", result);

          // store the JWT in cookies
          Cookies.set("accessToken", result);

          // redirect to /dashboard
          router.push("/dashboard");
        } else {
          setError(result.message || "Something went wrong");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to connect to the server.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg bg-white w-[100%] max-w-[300px]">
        <h1 className="text-center">Sign Up</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            onChange={handleUsername}
            value={username}
          />
          {usernameError && (
            <div className="text-sm text-red-500 mt-[-0.5em]">
              {usernameError}
            </div>
          )}
          <Input
            type="text"
            placeholder="Email"
            onChange={handleEmail}
            value={email}
          />
          {emailError && (
            <div className="text-sm text-red-500 mt-[-0.5em]">{emailError}</div>
          )}

          <Input
            type="password"
            placeholder="Password"
            onChange={handlePassword}
            value={password}
          />
          {passwordError && (
            <div className="text-sm text-red-500 mt-[-0.5em]">
              {passwordError}
            </div>
          )}

          <div className="flex justify-center">
            <Button text="Sign Up" type="submit" />
          </div>
          {error && (
            <div className="text-sm text-red-500 text-center">{error}</div>
          )}
          <div className="flex justify-center text-sm">
            Already have an account?
            <Link href="/" className="ml-1">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
