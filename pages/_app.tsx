import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import useUser from "@libs/client/useUser";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex justify-center w-screen ">
      <div className="justify-center ">
        <SWRConfig
          value={{
            fetcher: (url: string) =>
              fetch(url).then((response) => response.json()),
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </div>
    </div>
  );
}

export default MyApp;
