import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ArrowRight, Lock, Mail } from "lucide-react";
import AuthLeftSection from "../../components/common/Authentication/AuthLeftSection";
import { loginLeftSectionData } from "./config";
import { useSignInMutation } from "../../redux/services/authApi";
import { setCredentials } from "../../redux/slices/authSlice";

const Login = () => {
  const [signIn, { isLoading, error }] = useSignInMutation();
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

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#111813] dark:text-white flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-6xl">
        <div className="absolute inset-0 rounded-[34px] bg-primary/10 blur-3xl opacity-30" />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] items-stretch rounded-[34px] overflow-hidden shadow-2xl shadow-primary/10">
          <AuthLeftSection data={loginLeftSectionData} />

          <section className="bg-white dark:bg-black border border-[#dbe6df] dark:border-[#2a3a2e] p-8 md:p-10 rounded-[34px] lg:rounded-tl-none lg:rounded-bl-none min-h-[680px] flex flex-col">
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

              {(validationError || error) && (
                <p className="text-sm text-red-500">
                  {validationError || error?.data?.message || 'Something went wrong. Please try again.'}
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

              {/* <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                <span className="font-semibold uppercase tracking-[0.2em]">
                  or
                </span>
                <span className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              </div> */}

              {/* <button
                type="button"
                className="cursor-pointer w-full rounded-2xl border border-[#dbe6df] dark:border-[#2a3a2e] h-12 flex items-center justify-center gap-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#112117] transition"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button> */}
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
