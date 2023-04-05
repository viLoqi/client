import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Roboto_Serif, Piazzolla } from "@next/font/google";

const roboto_serif = Roboto_Serif({
  subsets: ["latin"],
  variable: "--roboto-serif",
});

const piazzolla = Piazzolla({ subsets: ["latin"], variable: "--piazzolla" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Component
      className={(roboto_serif.variable, piazzolla.variable)}
      {...pageProps}
    />
  );
}
