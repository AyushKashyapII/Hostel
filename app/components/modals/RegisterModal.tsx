"use client";
import React, { useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  FaUser,
  FaLock,
  FaGoogle,
  FaGithub,
  FaEyeSlash,
  FaEye,
  FaTimes,
} from "react-icons/fa";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registration successful", { position: "top-center" });
        registerModal.onClose();
      })
      .catch(() => {
        toast.error("Registration failed", { position: "top-center" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!registerModal.isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-8 w-full max-w-md rounded-lg shadow-lg">
        <button
          onClick={registerModal.onClose}
          className="absolute top-3 left-3 text-gray-700 hover:text-black text-xl"
        >
          <FaTimes size={24} />
        </button>
        <h1 className="text-2xl font-semibold text-center mb-4 text-black">
          Create an Account
        </h1>
        <div className="space-y-4">
          <div className="flex items-center border-b-2 border-gray-300">
            <FaUser className="text-gray-600 mr-3" size={20} />
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Name"
              className="w-full p-2 outline-none"
            />
          </div>
          <div className="flex items-center border-b-2 border-gray-300">
            <FaUser className="text-gray-600 mr-3" size={20} />
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="w-full p-2 outline-none"
            />
          </div>
          <div className="flex items-center border-b-2 border-gray-300">
            <FaLock className="text-black mr-3" size={20} />
            <input
              {...register("password", { required: true })}
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 outline-none"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="ml-3"
            >
              {isPasswordVisible ? (
                <FaEyeSlash size={20} />
              ) : (
                <FaEye size={20} />
              )}
            </button>
          </div>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
            className="w-full bg-black text-white py-2 rounded-lg mt-4"
          >
            {isLoading ? "Creating Account..." : "Register"}
          </button>
        </div>
        <div className="flex items-center my-4">
          <div className="w-full h-[1px] bg-gray-300"></div>
          <span className="px-2 text-gray-600 text-sm whitespace-nowrap">
            or sign up with
          </span>
          <div className="w-full h-[1px] bg-gray-300"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button className="bg-gray-100 p-3 rounded-full">
            <FaGoogle size={20} />
          </button>
          <button className="bg-gray-100 p-3 rounded-full">
            <FaGithub size={20} />
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-black">
            Already have an account?
            <button
              onClick={toggle}
              className="text-black font-semibold text-sm ml-2"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
