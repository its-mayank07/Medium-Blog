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

const Loading = ({ type }: { type: "signup" | "signin" }) => (
  <div className="flex justify-center items-center py-4">
    <svg className="animate-spin h-6 w-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
    </svg>
    <span className="ml-2 text-gray-700">Signing {type === "signup" ? "up" : "in"}...</span>
  </div>
);

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<AuthInput>(
    type === "signup"
      ? { name: "", email: "", password: "" }
      : { email: "", password: "" }
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function sendRequest() {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data.jwt;
      
      sessionStorage.setItem("token", jwt);
      sessionStorage.setItem("userId", response.data.id);
      dispatch(setUserId(response.data.id));
      navigate("/blogs");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        switch (status) {
          case 400:
            setError("Please check your input and try again.");
            break;
          case 401:
            setError("Invalid email or password.");
            break;
          case 403:
            setError("Invalid email or password.");
            break;
          case 409:
            setError("An account with this email already exists.");
            break;
          case 411:
            setError("Please provide valid information.");
            break;
          case 422:
            setError("Please provide valid information.");
            break;
          case 500:
            setError("Server error. Please try again later.");
            break;
          default:
            setError("An error occurred. Please try again.");
        }
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
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

          {error && (
            <div
              className="flex items-center gap-2 text-sm text-red-600 bg-red-100 px-3 py-2 rounded-md mt-1 border border-red-300"
              style={{
                animation: "fadeIn 0.3s ease-in-out",
              }}
            >
              <BiErrorCircle className="text-lg" />
              {error}
            </div>
          )}

          {loading && <Loading type={type} />}

          <button
            onClick={sendRequest}
            type="button"
            className="mt-2 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 transition-colors"
            disabled={loading}
          >
            {type === "signup" ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
