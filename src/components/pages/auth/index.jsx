import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../../features/auth/authActions";
import { Spinner } from "flowbite-react";
import { Button, Heading, Image, TabTitle } from "../../UI/atoms";
import { FloatingLabel } from "../../UI/molecules";
import { Alert, Footer } from "../../UI/organism";
import { Logo } from "../../../assets/images";

const Login = () => {
  TabTitle("Login");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, isError, token } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn({ username: username, password, navigate }));
  };

  useEffect(() => {
    token && navigate("/");
  }, [dispatch, token, navigate]);

  return (
    <>
      <div className="min-h-screen w-screen overflow-x-hidden flex flex-col md:flex-row gap-4">
        <div className="h-screen px-4 pt-14 md:pl-8 md:pr-4 min-w-[20rem] md:w-[24rem] max-w-[24] flex flex-col justify-between bg-white">
          <div className="flex-1">
            <section className="mb-4 flex justify-center items-center gap-2">
              <Image
                src={Logo}
                alt="logo"
                variant={"w-[2rem] mb-2 object-cover"}
              />
              <Heading
                text={"Login to your account"}
                variant="border-l pl-2 py-4 text-xl"
              />
            </section>
            <section className="m-auto">
              <form onSubmit={handleSubmit} className="py-4">
                <FloatingLabel
                  type={"text"}
                  text={"Username"}
                  value={username}
                  onChange={(e) => setEmail(e.target.value)}
                  variant={"border-b-0 rounded-t-lg"}
                />
                <FloatingLabel
                  type={"password"}
                  text={"Password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  disabled={isLoading}
                  type={"submit"}
                  variant={"mt-2 bg-sky-400 hover:bg-sky-500 text-white"}
                  text={!isLoading && "Login"}
                  icon={isLoading && <Spinner />}
                />
                <div className="my-4">
                  {isError && (
                    <Alert
                      message={isError}
                      variant={"text-slate-500 border border-slate-300"}
                    />
                  )}
                </div>
              </form>
              <div>
                <span className="mr-2 text-xs text-slate-600 font-semibold">
                  Masalah dengan akun?
                </span>
                <span className="text-xs text-sky-500 font-semibold">
                  Hubungi Admin atau Petugas!
                </span>
              </div>
            </section>
          </div>
          <Footer variant={"mb-4 justify-center"} />
        </div>
        <div className="relative flex-1 pt-14 px-8 hidden md:flex justify-start items-start bg-gradient-to-b from-cyan-500 to-blue-900">
          <section className="max-w-sm flex justify-center items-center gap-4">
            <span className="md:text-4xl font-semibold text-white">
              Bayar Retribusi Cepat dengan Mudah
            </span>
          </section>
          {isLoading && (
            <div className="absolute inset-0 flex justify-center items-center gap-2 text-white">
              <Spinner />
              Memuat info user ...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
