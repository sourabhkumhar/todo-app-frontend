import { useRouter } from "next/router";
import { createContext, useCallback, useEffect, useState } from "react";
import doFetch from "../functions/doFetch";

export const Data = createContext();

const DataProvider = ({ children }) => {
  const router = useRouter();
  const [login, setLogin] = useState({ isLoggedIn: undefined, data: null });

  const isLoggedIn = useCallback(async () => {
    try {
      const response = await doFetch(`auth/loginstatus`);
      setLogin(response);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      let response = await doFetch(`auth/logout`, "POST");
      setLogin(response);
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  }, [router]);

  useEffect(() => {
    isLoggedIn();
  }, [isLoggedIn]);

  return (
    <Data.Provider value={{ login, setLogin, logout }}>
      {children}
    </Data.Provider>
  );
};

export default DataProvider;
