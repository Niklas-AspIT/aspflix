import type { AppProps } from "next/app";
import UserAuth from "../lib/UserAuth";
import "../styles/App.scss";
import "../styles/normalize.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
