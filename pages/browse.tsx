import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import useAuth from "../lib/useAuth";
import Style from "../styles/Browse.module.scss";

const Browse = () => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (!auth.user && !auth.loading) {
      router.push("/signin");
    }
  }, [auth.user, auth.loading, router]);

  if (auth.loading) {
    return <Loader />;
  }

  return (
    <Layout hideSignIn={true} showSignOut={true}>
      <div className={Style.browse}></div>
    </Layout>
  );
};

export default Browse;
