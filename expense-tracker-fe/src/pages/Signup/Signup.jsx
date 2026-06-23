import { useState } from "react";
import { ArrowRight, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthLeftSection from "../../components/common/Authentication/AuthLeftSection";
import { signUpLeftSectionData } from "./config";
import { useCreateUserMutation } from "../../redux/services/authApi";

const Signup = () => {
  const [createUser, {isLoading, error}] = useCreateUserMutation()
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    if(formData.password !== formData.confirmPassword) {
      setValidationError('Passwords do not match.');
      return
    }

    try {
      await createUser(formData).unwrap();
      navigate('/login');
    } catch (err) {
      // error is also available via the `error` state from useCreateUserMutation
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-[#111813] dark:text-white flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-6xl">
        <div className="absolute inset-0 rounded-[34px] bg-primary/10 blur-3xl opacity-30" />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] items-stretch rounded-[34px] overflow-hidden shadow-2xl shadow-primary/10">
          <AuthLeftSection data={signUpLeftSectionData} />

          <section className="bg-white dark:bg-black border border-[#dbe6df] dark:border-[#2a3a2e] p-8 md:p-10 rounded-[34px] lg:rounded-tl-none lg:rounded-bl-none min-h-[680px] flex flex-col">
            <div className="mb-8">
              <p className="text-sm text-primary font-bold uppercase tracking-[0.2em] mb-3">
                Create account
              </p>
              <h2 className="text-3xl font-extrabold text-[#111813] dark:text-white">
                Join the community
              </h2>
              <p className="mt-3 text-sm text-[#6b7280] dark:text-slate-400 max-w-md">
                Set up your account and start tracking expenses with confidence.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold text-[#334155] dark:text-slate-300 mb-2"
                  >
                    First name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      className="w-full rounded-2xl border border-[#dbe6df] dark:border-[#2a3a2e] bg-[#f8faf9] dark:bg-[#102216] placeholder:text-slate-400 text-[#111813] dark:text-white h-12 pl-12 pr-4 outline-none transition focus:border-primary focus:bg-white dark:focus:bg-[#112117]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold text-[#334155] dark:text-slate-300 mb-2"
                  >
                    Last name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      className="w-full rounded-2xl border border-[#dbe6df] dark:border-[#2a3a2e] bg-[#f8faf9] dark:bg-[#102216] placeholder:text-slate-400 text-[#111813] dark:text-white h-12 pl-12 pr-4 outline-none transition focus:border-primary focus:bg-white dark:focus:bg-[#112117]"
                    />
                  </div>
                </div>
              </div>

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

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-[#334155] dark:text-slate-300 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create password"
                      className="w-full rounded-2xl border border-[#dbe6df] dark:border-[#2a3a2e] bg-[#f8faf9] dark:bg-[#102216] placeholder:text-slate-400 text-[#111813] dark:text-white h-12 pl-12 pr-4 outline-none transition focus:border-primary focus:bg-white dark:focus:bg-[#112117]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-semibold text-[#334155] dark:text-slate-300 mb-2"
                  >
                    Confirm password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                      className="w-full rounded-2xl border border-[#dbe6df] dark:border-[#2a3a2e] bg-[#f8faf9] dark:bg-[#102216] placeholder:text-slate-400 text-[#111813] dark:text-white h-12 pl-12 pr-4 outline-none transition focus:border-primary focus:bg-white dark:focus:bg-[#112117]"
                    />
                  </div>
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
                className="w-full rounded-2xl bg-primary text-black h-12 font-semibold text-base shadow-lg shadow-primary/20 hover:brightness-95 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <div className="mt-auto pt-8 text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?
              <Link
                to="/login"
                className="font-semibold text-primary ml-1 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Signup;
