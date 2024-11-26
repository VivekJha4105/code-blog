import { useState } from "react";
import { useForm } from "react-hook-form";

import { InputField, Logo } from "../Components/index";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

function SignUp() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const signUp = async (data) => {
    try {
      setError("");

      const registeredUser = await authService.createAccount(data);
      if (registeredUser) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign Up to create an Account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/signin"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(signUp)} className="mt-4 md:mt-8">
          <div className="space-y-4">
            <InputField
              lable="Email: "
              type="text"
              placeholder="Enter your Email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/.test(
                      value
                    ) || "Invalid Email Address",
                },
              })}
            />
            <InputField
              lable="Password"
              type="password"
              placeholder="Enter your Password"
              {...register("password", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                      value
                    ) ||
                    "Password must contain atleast one Uppercase, one Lowercase, a digit, a special symbol and atleast 6 characters long",
                },
              })}
            />
            <InputField
              lable="Full Name"
              type="text"
              placeholder="Enter your Full Name"
              {...register("fullname", { minLength: 3, maxLength: 25 })}
            />
            <button
              type="submit"
              className="p-2 md:px-5 py-3 font-semibold duration-200 shadow-lg bg-slate-600 text-white hover:bg-slate-800 cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
