import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AccountStateProvider } from "../src/utils/useAccountStore";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AccountStateProvider>
      <Component {...pageProps} />
    </AccountStateProvider>
  );
}
export default MyApp;
