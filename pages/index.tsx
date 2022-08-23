import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import useAuth from "../lib/useAuth";

const Home: NextPage = () => {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      router.push("/browse");
    }
  }, [auth.user, router]);

  if (auth.loading) {
    return <Loader />;
  }

  return <Layout hero={true}></Layout>;
};

export default Home;
