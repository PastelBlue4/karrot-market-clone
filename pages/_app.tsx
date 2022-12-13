import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex justify-center ">
      <div className="min-w-[568px] max-w-xl h-auto">
        <Component {...pageProps} />
      </div>{" "}
    </div>
  );
}

export default MyApp;
