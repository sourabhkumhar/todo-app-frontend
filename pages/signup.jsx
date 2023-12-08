import React, { useState } from "react";
import { handleState } from "next-lesscode/functions";
import { toast } from "react-toastify";
import doFetch from "@/sources/functions/doFetch";
import Router from "next/router";

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleState(setForm, value, name);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required!");
      return;
    }

    const resp = await doFetch("auth/signup", "POST", form);

    if (resp.hasError) {
      toast.error(resp.message);
      return;
    }

    toast.success(resp.message);
    Router.push("/login");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-[#0000002e] p-3 mt-20 flex flex-col gap-2 w-[300px] rounded-md">
        <div className="text-center p-1 text-xl font-bold">Create Account</div>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="p-3 rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="p-3 rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="p-3 rounded-md"
        />
        <button
          onClick={handleSubmit}
          className="bg-emerald-500 p-3 rounded-md"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
