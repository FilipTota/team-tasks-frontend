"use client";
import { useState } from "react";
import SignInForm from "./auth/signin/page";
import SignUpForm from "./auth/signup/page";

export default function Home() {
  const [formType, setFormType] = useState("signin");

  const toggleForm = () => {
    setFormType(formType === "signin" ? "signup" : "signin");
  };

  return (
    <div>
      <h1>{formType === "signin" ? "Sign In" : "Sign Up"}</h1>
      {formType === "signin" ? <SignInForm /> : <SignUpForm />}
      <p>
        {formType === "signin"
          ? "Don't have an account?"
          : "Already have an account?"}
        <button onClick={toggleForm}>
          {formType === "signin" ? "Sign Up" : "Sign In"}
        </button>
      </p>
    </div>
  );
}
