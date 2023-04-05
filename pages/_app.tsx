import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Piazzolla } from "@next/font/google";

const piazzolla = Piazzolla({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={piazzolla.className}>
      <Component {...pageProps} />
    </main>
  );
}
