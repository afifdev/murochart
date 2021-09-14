import Head from "next/head";
import { useContext } from "react";
import { UserContext } from "./useUser";
import Home from "@pages/index";
import Layout from "@components/Layout";

const withAuth = (Component, portal) => {
  const Auth = (props) => {
    const user = useContext(UserContext);
    if (!user.isDone) {
      return (
        <Layout>
          <Head>
            <title>Loading...</title>
          </Head>
          <div>Loading...from withAuth</div>
        </Layout>
      );
    } else if (!user.isSigned && portal) {
      return <Component {...props} />;
    } else if (user.isSigned && !portal) {
      return <Component {...props} />;
    } else {
      return <Home />;
    }
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
