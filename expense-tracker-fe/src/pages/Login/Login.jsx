import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import AuthLeftSection from "../../components/common/Authentication/AuthLeftSection";
import { loginLeftSectionData } from "./config";
import { useSignInMutation, useGoogleSignInMutation } from "../../redux/services/authApi";
import { setCredentials } from "../../redux/slices/authSlice";

const Login = () => {
  const [signIn, { isLoading, error }] = useSignInMutation();
  const [googleSignIn, { error: googleError }] = useGoogleSignInMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setValidationError("")
    if(!formData.email || !formData.password){
      setValidationError("Email & Password are required")
      return
    }

    try {
      const result = await signIn(formData).unwrap();
      dispatch(setCredentials(result.data));
      navigate('/dashboard')
    } catch (err) {
      console.error(err.message)
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const result = await googleSignIn(credentialResponse.credential).unwrap();
      dispatch(setCredentials(result.data));
      navigate('/dashboard')
    } catch (err) {
      console.error(err.message)
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#111813] dark:text-white flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-6xl">
        <div className="absolute inset-0 rounded-[34px] bg-primary/10 blur-3xl opacity-30" />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] items-stretch rounded-[34px] overflow-hidden shadow-2xl shadow-primary/10">
          <AuthLeftSection data={loginLeftSectionData} />

          <section className="bg-white dark:bg-black border border-[#dbe6df] dark:border-[#2a3a2e] p-8 md:p-10 rounded-[34px] lg:rounded-tl-none lg:rounded-bl-none lg:min-h-[760px] flex flex-col">
            <div className="mb-8">
              <p className="text-sm text-primary font-bold uppercase tracking-[0.2em] mb-3">
                Welcome back
              </p>
              <h2 className="text-3xl font-extrabold text-[#111813] dark:text-white">
                Sign in to continue
              </h2>
              <p className="mt-3 text-sm text-[#6b7280] dark:text-slate-400 max-w-md">
                Access your personal expense dashboard and stay on top of every
                transaction.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#334155] dark:text-slate-300 mb-2"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full rounded-2xl border border-[#dbe6df] dark:border-[#2a3a2e] bg-[#f8faf9] dark:bg-[#102216] placeholder:text-slate-400 text-[#111813] dark:text-white h-12 pl-12 pr-4 outline-none transition focus:border-primary focus:bg-white dark:focus:bg-[#112117]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-[#334155] dark:text-slate-300"
                  >
                    Password
                  </label>
                  {/* <button
                    type="button"
                    className="cursor-pointer text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button> */}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-[#dbe6df] dark:border-[#2a3a2e] bg-[#f8faf9] dark:bg-[#102216] placeholder:text-slate-400 text-[#111813] dark:text-white h-12 pl-12 pr-4 outline-none transition focus:border-primary focus:bg-white dark:focus:bg-[#112117]"
                  />
                </div>
              </div>

              {(validationError || error || googleError) && (
                <p className="text-sm text-red-500">
                  {validationError || error?.data?.message || googleError?.data?.message || 'Something went wrong. Please try again.'}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer w-full rounded-2xl bg-primary text-black h-12 font-semibold text-base shadow-lg shadow-primary/20 hover:brightness-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Please wait' : 'Continue'}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </button>

              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                <span className="font-semibold uppercase tracking-[0.2em]">
                  or
                </span>
                <span className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              </div>

              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => console.error("Google sign-in failed")}
                  shape="pill"
                  text="continue_with"
                  size="large"
                />
              </div>
            </form>

            <div className="mt-auto pt-8 text-center text-sm text-slate-500 dark:text-slate-400">
              Don&apos;t have an account?
              <Link
                to="/signup"
                className="font-semibold text-primary ml-1 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;
