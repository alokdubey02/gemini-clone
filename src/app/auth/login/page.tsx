"use client";

import countryCodes from "@/lib/countries";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/slices/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { z } from "zod";

const schema = z.object({
  countryCode: z.string().min(1, "Country code required"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
});

type LoginForm = z.infer<typeof schema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [count, setCount] = useState(30);

  const handleLogin = () => {
    setOtpSent(true);
    setCount(30);
    setOtp("");
    setTimeout(() => {
      setOtp("123456");
      toast.success("OTP is 123456", {
        position: "top-right",
        type: "default",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    }, 1000);
  };

  const handleResend = () => {
    if (count > 0) return;

    setCount(30);
    setOtp("");
    setTimeout(() => {
      setOtp("123456");
      toast.success("OTP is 123456", {
        position: "top-right",
        type: "default",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    }, 1000);
  };
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (count > 0) {
      timer = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [count]);

  const handleVerify = () => {
    dispatch(
      login({
        phoneNumber: watch("phoneNumber"),
        countryCode: watch("countryCode"),
      })
    );
    toast.success("Logged in successfully", {
      position: "top-right",
      type: "default",
      autoClose: 5000,
      theme: "dark",
      transition: Bounce,
    });
    localStorage.setItem(
      "auth",
      JSON.stringify({
        phoneNumber: watch("phoneNumber"),
        countryCode: watch("countryCode"),
      })
    );
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Gemini</h2>
        {!otpSent ? (
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div className="relative w-full">
              <select
                {...register("countryCode")}
                className="w-full border p-2 rounded appearance-none cursor-pointer"
              >
                {countryCodes.map((c) => (
                  <option
                    key={c.code}
                    value={c.dial_code}
                    className="bg-sky-200 text-gray-900"
                  >
                    {c.name} ({c.dial_code})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-300 ">
                ▼
              </div>
            </div>
            <input
              type="tel"
              {...register("phoneNumber")}
              placeholder="Phone number"
              className="w-full border p-2 rounded"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 rounded cursor-pointer"
            >
              Login
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <div className="flex gap-2">
              <button
                onClick={handleResend}
                disabled={count > 0}
                className={`${
                  count > 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 cursor-pointer"
                } text-white w-full py-2 rounded `}
              >
                {count > 0 ? `Resend OTP in ${count}s` : "Resend OTP"}
              </button>
              <button
                onClick={handleVerify}
                disabled={otp !== "123456"}
                className="bg-green-500 disabled:bg-gray-400 text-white w-full py-2 rounded cursor-pointer"
              >
                Verify
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
