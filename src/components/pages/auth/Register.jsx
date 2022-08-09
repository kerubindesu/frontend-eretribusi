import React from "react";
import { Link } from "react-router-dom";
import { Button, Input, Heading } from "../../UI/atoms";

const Register = () => {
  return (
    <>
      <div className="pb-4 text-xs">
        <Heading text={"Register"} variant="text-xl" />
        <span className="flex gap-1">
          or
          <Link to="/auth">
            <p className="text-sky-500 hover:text-sky-600 font-semibold">
              already have an account
            </p>
          </Link>
        </span>
      </div>
      <form>
        <Input
          type={"text"}
          name={"nama"}
          placeholder={"Nama Lengkap"}
          variant={"border-b-0 rounded-t-lg"}
        />
        <Input
          type={"text"}
          name={"nomoridentitas"}
          placeholder={"Nomor Identitas"}
          variant={"border-b-0"}
        />
        <Input
          type={"email"}
          name={"email"}
          placeholder={"Email"}
          variant={"border-b-0"}
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
          text={"Register"}
        />
      </form>
    </>
  );
};

export default Register;
