import { Link, useNavigate } from "react-router-dom";
import LabelledInput from "./LabelledInput";
import { useState } from "react";
import { type SignupInput, type SigninInput } from "@its.mayank7/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

type AuthInput = SignupInput | SigninInput;

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<AuthInput>(
    type === "signup"
      ? { name: "", email: "", password: "" }
      : { email: "", password: "" }
  );
  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,postInputs);
      const jwt = response.data.jwt;
      // console.log(jwt);
      
      localStorage.setItem("token", jwt);
      navigate("/blogs")
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert("An error occurred. Please try again.");
      } else {
        if (typeof error === "object" && error !== null && "message" in error) {
          alert((error as { message: string }).message);
        } else {
          alert("An unknown error occurred.");
        }
      }
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg flex flex-col">
        <div className="mb-6">
          <div className="text-3xl font-bold text-center mb-2">
            {type === "signup"
              ? "Create an account"
              : "Sign in to your account"}
          </div>
          <div className="text-slate-500 text-center text-sm">
            {type === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              className="pl-1 underline"
              to={type === "signin" ? "/signup" : "/signin"}
            >
              {type === "signin" ? "Sign up" : "Login"}
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {type === "signup" && (
            <LabelledInput
              label="Name"
              placeholder="Enter your username"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...(c as SignupInput),
                  name: e.target.value,
                }));
              }}
            />
          )}
          <LabelledInput
            label="email"
            placeholder="Enter your email"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                email: e.target.value,
              }));
            }}
          />
          <LabelledInput
            type={"password"}
            label="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                password: e.target.value,
              }));
            }}
          />
          <button
            onClick={sendRequest}
            type="button"
            className="mt-2 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 transition-colors"
          >
            {type === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
