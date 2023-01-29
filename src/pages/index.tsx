import Head from "next/head";
import { Inter } from "@next/font/google";
import { Button, useColorMode } from "@chakra-ui/react";
// import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main>hello</main>
    </>
  );
}
