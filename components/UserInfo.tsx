import React from "react";
import Button from "./Button";
import Link from "next/link";

const UserInfo = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-2 my-6 shadow-lg p-8 bg-white">
        <div>
          <span className="font-bold">Name:</span> test
        </div>
        <div>
          <span className="font-bold">Email:</span> test@gmail.com
        </div>
        <div className=" flex justify-center">
          <Link href={"/"}>
            <Button text="Log Out" width="6em" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
