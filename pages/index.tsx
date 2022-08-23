import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import useAuth from "../lib/useAuth";
import Link from "next/link";
import Style from "../styles/Home.module.scss";

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

  return (
    <Layout hero={true}>
      <div className={Style.landing}>
        <h3 className={Style.landing__title}>
          Watch unlimited movies, series & much more.
        </h3>
        <Link href="/signin">
          <a className={Style.landing__signin}>Sign in</a>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
