import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Provider/AuthProvider";
import animationData from "../../assets/login.json";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const Navigate = useNavigate();
  // const axiosPublic = useAxiosPublic();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    console.log(form);
    const email = form.get("email");
    const password = form.get("password");
    console.log(email, password);
    setErrorMsg("");
    signIn(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        e.target.reset();
        toast("Successfully logged in!");

        Navigate("/dashboard/manageTask");
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMsg("Invalid email or password");
      });
  };

  return (
    <>
      <Helmet>
        <title>TaskFlow | LogIn</title>
      </Helmet>
      <div className="hero min-h-screen ">
        <div className="hero-content justify-between flex-col lg:flex-row">
          <div className="text-center md:w-1/2 lg:text-left">
            <Lottie animationData={animationData} autoPlay={true} />
          </div>
          <div className="card md:w-1/2 p-7 max-w-sm shadow-2xl">
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="text-black label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input  bg-white input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input bg-white input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn text-black hover:text-white hover:bg-black btn-outline">
                  Login
                </button>
              </div>
            </form>
            {errorMsg && <p>{errorMsg}</p>}
            <p className="flex justify-between">
              <small>New here?</small>{" "}
              <Link
                className=" hover:text-blue-500"
                state={location.state}
                to="/register"
              >
                Register
              </Link>
            </p>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
