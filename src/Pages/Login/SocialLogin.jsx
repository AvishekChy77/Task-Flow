import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";

const SocialLogin = () => {
  const { googleLogIn } = useContext(AuthContext);
  const Navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const handleSocialSignIn = (social) => {
    social()
      .then((res) => {
        console.log(res.user);
        const userInfo = {
          email: res.user?.email,
          name: res.user?.displayName,
          occupation: "student",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          toast("Successfully logged in!");
          Navigate("/dashboard/manageTask");
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className=" w-full">
      <div
        onClick={() => handleSocialSignIn(googleLogIn)}
        className=" cursor-pointer bg-slate-200 flex rounded-md gap-5 justify-center items-center hover:bg-slate-400 text-lg "
      >
        <span className="py-2  font-semibold">Continue with</span>
        <FcGoogle></FcGoogle>
      </div>
    </div>
  );
};

export default SocialLogin;
