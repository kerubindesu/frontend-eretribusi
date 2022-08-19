import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../features/auth/authActions";
import { Spinner } from "flowbite-react";
import { Button, Heading } from "../../UI/atoms";
import { FloatingLabel } from "../../UI/molecules";
import { Alert } from "../../UI/organism";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.auth);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(userLogin({ email: email.toLowerCase(), password }));
      setEmail("");
      setPassword("");
      navigate("/welcome");
    } catch (error) {
      console.log(error);
      errRef.current.focus();
    }
  };

  const content = loading ? (
    loading
  ) : (
    <>
      <section>
        <div className="pb-4 text-xs">
          <Heading text={"Login"} variant="text-xl" />
          <span className="flex gap-1">
            atau
            <Link to="/auth/register">
              <p className="text-sky-500 hover:text-sky-600 font-semibold">
                belum memiliki akun
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
            type={"password"}
            text={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            disabled={loading}
            type={"submit"}
            variant={"mt-2 bg-sky-400 hover:bg-sky-500 text-white"}
            text={!loading && "Login"}
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

  return content;
};

export default Login;
