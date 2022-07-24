import React from "react";
import { Button, Input, Heading, Image } from "../components/items/";
import Logo from "../assets/images";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <div className="p-4 lg:p-8 w-screen min-h-screen flex flex-col items-center justify-center overflow-x-hidden">
        <div className="mt-[-4rem] w-full md:w-1/2 lg:w-1/3">
          <Image
            src={Logo}
            alt="logo"
            variant={"w-1/4 md:1/5 mb-2 mx-auto object-cover"}
          />
          <div className="pb-4 text-xs">
            <Heading text={"Register"} variant="text-xl" />
            <span className="flex gap-1">
              or
              <Link to="/login">
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
              name={"nomor_identitas"}
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
              name={"Register"}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
