import { Link, useNavigate } from "react-router-dom";
import LabelledInput from "./LabelledInput";
import { useState } from "react";
import { type SignupInput, type SigninInput } from "@its.mayank7/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { BiErrorCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setUserId } from "../stored/InfoSlicer";

type AuthInput = SignupInput | SigninInput;

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<AuthInput>(
    type === "signup"
      ? { name: "", email: "", password: "" }
      : { email: "", password: "" }
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isInvalid, setIsInvalid] = useState(false); // initially false

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data.jwt;
      
      localStorage.setItem("token", jwt);
      localStorage.setItem("userId", response.data.id);
      dispatch(setUserId(response.data.id));
      setIsInvalid(false);
      navigate("/blogs");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setIsInvalid(true); // Show error
      } else {
        alert("An unknown error occurred.");
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
            label="Email"
            placeholder="Enter your email"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                email: e.target.value,
              }));
            }}
          />
          <LabelledInput
            type="password"
            label="Password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                password: e.target.value,
              }));
            }}
          />

          {isInvalid && (
            <div
              className="flex items-center gap-2 text-sm text-red-600 bg-red-100 px-3 py-2 rounded-md mt-1 border border-red-300"
              style={{
                animation: "fadeIn 0.3s ease-in-out",
              }}
            >
              <BiErrorCircle className="text-lg" />
              Invalid email or password.
            </div>
          )}

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
