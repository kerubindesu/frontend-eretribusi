import React from "react";
import { Link } from "react-router-dom";
import { Button, Input, Heading } from "../../UI/atoms";

const Login = () => {
  return (
    <>
      <div className="pb-4 text-xs">
        <Heading text={"Sign in"} variant="text-xl" />
        <span className="flex gap-1">
          or
          <Link to="/auth/register">
            <p className="text-sky-600 hover:text-sky-500 font-semibold">
              create an account
            </p>
          </Link>
        </span>
      </div>
      <form>
        <Input
          type={"email"}
          name={"email"}
          placeholder={"Email"}
          variant={"border-b-0 rounded-t-lg"}
        />
        <Input
          type={"password"}
          name={"password"}
          placeholder={"Password"}
          variant={"rounded-b-lg"}
        />
        <Button
          type={"submit"}
          variant={"mt-2 bg-sky-600 hover:bg-sky-500 text-white"}
          text={"Sign in"}
        />
      </form>
    </>
  );
};

export default Login;
