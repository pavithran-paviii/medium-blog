import { SignIn } from "@pavithran_codes/medium-validation";
import { useState } from "react";
import { Link } from "react-router-dom";
import CustomInput from "./CustomInputs";
import axios from "axios";

const SignInContainer = () => {
  const [signIn, setSignIn] = useState<SignIn>({
    email: "",
    password: "",
  });

  //functions
  async function signUpUser() {
    try {
      let response = await axios.post(
        `https://backend.pavithranr65.workers.dev/api/v1/signup`,
        signIn
      );
      console.log(response, "response create new user");
    } catch (error) {
      console.log(error, "Create new user error");
    }
  }

  return (
    <div className="flex flex-col gap-6 h-max items-center">
      <div className="text-center">
        <div className="text-4xl font-bold">Login to your account</div>
        <div className="text-zinc-500 text-lg font-normal mt-1.5">
          Create new account?{" "}
          <Link to="/signup" className="text-zinc-500 underline	">
            Signup
          </Link>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2.5">
        <CustomInput
          title={"Email"}
          placeholder={"m@example.com"}
          name={"email"}
          setState={setSignIn}
        />
        <CustomInput
          title={"Password"}
          placeholder={"Enter password..."}
          name={"password"}
          type={"password"}
          setState={setSignIn}
        />
      </div>
      <button className="rounded-md bg-black text-white text-base font-semibold cursor-pointer px-2 py-2 w-full">
        Login
      </button>
    </div>
  );
};

export default SignInContainer;
