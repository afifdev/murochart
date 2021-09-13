import Head from "next/head";
import Router from "next/router";
import { useContext, useEffect } from "react";
import Layout from "@components/Layout";
import { UserContext } from "@utils/useUser";

export default function Index() {
  const user = useContext(UserContext);
  useEffect(() => {
    if (user.isDone) {
      if (user.isSigned) {
        Router.push("/home");
      } else {
        Router.push("/login");
      }
    }
  }, [user]);
  return (
    <Layout>
      <Head>
        <title>Loading...</title>
      </Head>
    </Layout>
  );
}
