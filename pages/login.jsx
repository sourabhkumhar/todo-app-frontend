import React, { useContext, useState } from "react";
import { handleState } from "next-lesscode/functions";
import { toast } from "react-toastify";
import doFetch from "@/sources/functions/doFetch";
import Router from "next/router";
import { Data } from "@/sources/context/DataProvider";

const LoginPage = () => {
  const { setLogin } = useContext(Data);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    handleState(setForm, value, name);
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      toast.error("Crential Required!");
      return;
    }

    const resp = await doFetch("auth/login", "POST", form);

    if (resp.hasError) {
      toast.error(resp.message);
      return;
    }

    setLogin({
      isLoggedIn: true,
      data: resp.data,
    });

    toast.success(resp.message);
    Router.push("/");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-[#0000002e] p-3 mt-20 flex flex-col gap-2 w-[300px] rounded-md">
        <div className="text-center p-1 text-xl font-bold">Access Account</div>
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
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
