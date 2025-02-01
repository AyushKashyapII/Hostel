"use client";
import axios from "axios";
import { useState, useCallback } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  FaUser,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaGithub,
  FaTimes,
} from "react-icons/fa";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

const LoginModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/login", data)
      .then(() => {
        toast.success("Login Successful!! Welcome Back", {
          position: "top-center",
        });
      })
      .catch(() => {
        toast.error("Login Failed", { position: "top-center" });
      })
      .finally(() => {
        loginModal.onClose();
      });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  if (!loginModal.isOpen) return null; // Only render modal if loginModal.isOpen is true

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative z-10 flex flex-col items-center bg-white p-10 w-[90%] max-w-md rounded-lg shadow-lg">
        <button
          onClick={loginModal.onClose}
          className="absolute top-3 left-3 text-gray-700 hover:text-black text-xl"
        >
          <FaTimes size={24} />
        </button>

        <h1 className="text-2xl text-black font-semibold mb-4">
          Welcome Back!
        </h1>
        <p className="text-black text-lg mb-6">Login to your account</p>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex items-center border-b-2 border-black">
            <FaUser className="text-black mr-3" size={20} />
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="w-full p-2 text-black bg-white outline-none"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">Email is required</p>
          )}

          <div className="mb-4 flex items-center border-b-2 border-black">
            <FaLock className="text-black mr-3" size={20} />
            <input
              {...register("password", { required: true })}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 text-black bg-transparent outline-none"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="ml-3"
            >
              {isPasswordVisible ? (
                <FaEyeSlash size={20} color="black" />
              ) : (
                <FaEye size={20} color="black" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">Password is required</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-lg mt-6"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-black text-lg mt-4 cursor-pointer">
          Forgot Password?
        </p>

        <div className="flex items-center my-6 w-full">
          <div className="w-full h-[1px] bg-black"></div>
          <span className="px-4 text-black whitespace-nowrap">
            or login with
          </span>
          <div className="w-full h-[1px] bg-black"></div>
        </div>

        <div className="flex items-center justify-center mt-6">
          <p className="text-black text-sm">Don't have an account?</p>
          <button
            onClick={toggle}
            className="text-black font-semibold text-sm ml-2"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
