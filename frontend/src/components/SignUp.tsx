import { SignUp } from "@pavithran_codes/medium-validation";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "./CustomInputs";
import axios from "axios";
import { toast } from "react-toastify";

const SignUpContainer = () => {
  const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(false);
  const [signUp, setSignUp] = useState<SignUp>({
    email: "",
    password: "",
    name: "",
  });

  //functions
  async function signUpUser() {
    setLocalLoading(true);
    try {
      let response = await axios.post(
        `https://backend.pavithranr65.workers.dev/api/v1/signup`,
        signUp
      );
      setLocalLoading(false);
      if (response?.data?.status) {
        localStorage.setItem("medium-clone", response?.data?.token);
        toast.success(response?.data?.message);
        navigate("/");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      setLocalLoading(false);
      toast.error("Error while trying to create user!");
      console.log(error, "Create new user error");
    }
  }

  if (localStorage.getItem("medium-clone")) {
    navigate("/");
  }

  return (
    <div className="flex flex-col gap-6 h-max items-center">
      <div className="text-center">
        <div className="text-4xl font-bold">Create an account</div>
        <div className="text-zinc-500 text-lg font-normal mt-1.5">
          Already have an account?{" "}
          <Link to="/signin" className="text-zinc-500 underline	">
            Login
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2.5">
        <CustomInput
          title={"Username"}
          placeholder={"Enter your username"}
          name={"username"}
          setState={setSignUp}
        />
        <CustomInput
          title={"Email"}
          placeholder={"m@example.com"}
          name={"email"}
          setState={setSignUp}
        />
        <CustomInput
          title={"Password"}
          placeholder={"Enter password..."}
          name={"password"}
          type={"password"}
          setState={setSignUp}
        />
      </div>
      <button
        className={`rounded-md bg-black text-white text-base font-semibold cursor-pointer px-2 py-2 w-full ${
          localLoading ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={signUpUser}
      >
        {localLoading ? "Loading..." : "Sign Up"}
      </button>
    </div>
  );
};

export default SignUpContainer;
