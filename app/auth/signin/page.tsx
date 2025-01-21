"use client";
import React from "react";

const LoginForm = () => {
  const handleSignIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(`Sign In`);
  };

  return (
    <>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => console.log("e.target.value :>> ", e.target.value)}
            // required
          />
        </div>
        <div>
          <label htmlFor="password">Passoword</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => console.log("e.target.value :>> ", e.target.value)}
            // required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </>
  );
};

export default LoginForm;
