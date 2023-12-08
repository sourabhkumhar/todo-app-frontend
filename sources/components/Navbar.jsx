import React, { useContext } from "react";
import { Data } from "../context/DataProvider";
import Router from "next/router";

const Navbar = () => {
  const { login, logout } = useContext(Data);
  return (
    <div className="bg-black text-white flex items-center justify-between p-3">
      <div className="text-2xl">Todo Manager</div>
      <div className="flex items-center gap-3">
        {login?.isLoggedIn ? (
          <>
            <div
              onClick={logout}
              className="px-2 py-1 bg-emerald-500 hover:bg-emerald-600 duration-300 cursor-pointer rounded-md"
            >
              Logout
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => Router.push("/login")}
              className="px-2 py-1 bg-emerald-500 hover:bg-emerald-600 duration-300 cursor-pointer rounded-md"
            >
              Login
            </div>
            <div
              onClick={() => Router.push("/signup")}
              className="px-2 py-1 bg-emerald-500 hover:bg-emerald-600 duration-300 cursor-pointer rounded-md"
            >
              Signup
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
