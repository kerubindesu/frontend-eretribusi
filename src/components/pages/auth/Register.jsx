import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../../features/auth/authSlice";
import { Spinner } from "flowbite-react";
import { Button, Heading } from "../../UI/atoms";
import { FloatingLabel } from "../../UI/molecules";
import { Alert } from "../../UI/organism";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const { userAuth, loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(userRegister({ email: email.toLowerCase(), role, password }));
    } catch (error) {
      console.table(error);
    }
  };

  useEffect(() => {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    if (userAuth) navigate("/");
  }, [navigate, userAuth]);

  return (
    <>
      <section>
        <div className="pb-4 text-xs">
          <Heading text={"Register"} variant="text-xl" />
          <span className="flex gap-1">
            atau
            <Link to="/auth">
              <p className="text-sky-500 hover:text-sky-600 font-semibold">
                sudah memiliki akun
              </p>
            </Link>
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <FloatingLabel
            type={"email"}
            text={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant={"border-b-0 rounded-t-lg"}
          />
          <FloatingLabel
            type={"text"}
            text={"Role"}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <FloatingLabel
            type={"password"}
            text={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            disabled={loading}
            type={"submit"}
            variant={"mt-2 bg-sky-400 hover:bg-sky-500 text-white"}
            text={!loading && "Register"}
            icon={loading && <Spinner />}
          />
          <div className="my-2">
            {error && (
              <Alert
                message={error}
                variant={"text-red-700 bg-red-100 border border-red-700"}
              />
            )}
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
