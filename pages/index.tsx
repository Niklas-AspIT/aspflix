import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import useAuth from "../lib/useAuth";
import Style from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const [email, emailSet] = useState<string>("");
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
        <p className={Style.landing__text}>
          Stream it anywhere in high definition.
        </p>
        <form
          className={Style.landing__register}
          onSubmit={(e) => {
            e.preventDefault();

            router.push({
              pathname: "/register",
              query: {
                email: email,
              },
            });
          }}
        >
          <input
            type="email"
            className={Style.register__input}
            onChange={(e) => emailSet(e.currentTarget.value)}
            placeholder="E-mail"
            required
          />

          <button className={Style.register__submit} type="submit">
            Sign up
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Home;
