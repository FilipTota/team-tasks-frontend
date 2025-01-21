import React from "react";

const SignUpForm = () => {
  const handleSignUp = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(`Sign Up`);
  };
  return (
    <>
      <form onSubmit={handleSignUp}>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => console.log("e.target.value :>> ", e.target.value)}
            // required
          />
        </div>
        <div>
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            onChange={(e) => console.log("e.target.value :>> ", e.target.value)}
            // required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignUpForm;
