import Alert from "@/sources/components/Alert";
import Navbar from "@/sources/components/Navbar";
import DataProvider from "@/sources/context/DataProvider";
import "@/styles/globals.css";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["devanagari"],
  weight: ["200", "400", "700"],
});

export default function App({ Component, pageProps }) {
  return (
    <DataProvider>
      <div className={font.className}>
        <Navbar />
        <Alert />
        <Component {...pageProps} />
      </div>
    </DataProvider>
  );
}
