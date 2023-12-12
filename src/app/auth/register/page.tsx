"use client";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const INPUTS_CLASS =
  "p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full";

const Page: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return alert("Passwords do not match");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/auth/login");
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="w-1/4"
      >
        <h1 className="text-slate-200 font-bold text-4xl mb-4">Register</h1>
        <label
          className="text-slate-500  mb-2 mt-4 block text-sm"
          htmlFor="username"
        >
          Username:
        </label>
        <input
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
          })}
          className={INPUTS_CLASS}
          placeholder="Username"
        />
        {errors.username && (
          <span className="text-red-500 text-xs">
            {errors.username.message?.toString()}
          </span>
        )}
        <label
          className="text-slate-500  mb-2 mt-4 block text-sm"
          htmlFor="email"
        >
          Email:
        </label>
        <input
          type="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: /^\S+@\S+$/i,
          })}
          className={INPUTS_CLASS}
          placeholder="Email"
        />
        {errors.email && (
          <span className="text-red-500 text-xs">
            {errors.email.message?.toString()}
          </span>
        )}
        <label
          className="text-slate-500  mb-2 mt-4 block text-sm"
          htmlFor="password"
        >
          Password:
        </label>
        <input
          type="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
          })}
          className={INPUTS_CLASS}
          placeholder="******"
        />

        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message?.toString()}
          </span>
        )}

        <label
          className="text-slate-500  mb-2 mt-4 block text-sm"
          htmlFor="confirmPassword"
        >
          Confirm Password:
        </label>
        <input
          type="confirmPassword"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Confirm Password is required",
            },
          })}
          className={INPUTS_CLASS}
          placeholder="******"
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword.message?.toString()}
          </span>
        )}

        <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Page;
