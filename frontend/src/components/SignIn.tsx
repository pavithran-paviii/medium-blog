import { SignIn } from "@pavithran_codes/medium-validation";
import { useState } from "react";
import { Link } from "react-router-dom";
import CustomInput from "./CustomInputs";

const SignInContainer = () => {
  const [signUp, setSignUp] = useState<SignIn>({
    email: "",
    password: "",
  });

  console.log(signUp, "signUp");

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
      <button className="rounded-md bg-black text-white text-base font-semibold cursor-pointer px-2 py-2 w-full">
        Login
      </button>
    </div>
  );
};

export default SignInContainer;
