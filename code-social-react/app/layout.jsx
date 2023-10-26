"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import BodyContent from "./bodyContent";
import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export const dynamicParams = true,
  revalidate = Infinity,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Provider store={store}>
          <BodyContent>
            {children}
          </BodyContent>
        </Provider>
      </body>
    </html>
  );
}
