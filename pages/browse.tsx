import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import MovieSection from "../components/MovieSection";
import useAuth from "../lib/useAuth";
import Style from "../styles/Browse.module.scss";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

interface BrowseProps {
  popularMovies: { [key: string]: any };
}

const Browse: NextPage<BrowseProps> = ({ popularMovies }) => {
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

  const featuredMovie =
    popularMovies.results[
      Math.floor(Math.random() * popularMovies.results.length)
    ];

  return (
    <Layout hideSignIn={true} showSignOut={true}>
      <div className={Style.browse}>
        <div className={Style.browse__featured}>
          <Image
            layout="fill"
            src={`${IMAGE_URL}/${featuredMovie.backdrop_path}`}
            alt="Movie poster"
            objectFit="cover"
            style={{ zIndex: "-1" }}
          />
          <h2 className={Style.featured__title}>{featuredMovie.title}</h2>
        </div>
        <MovieSection title="Popular movies" movies={popularMovies.results} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const API_KEY = process.env.API_KEY;
  const BASE_URL = "http://api.themoviedb.org/3";

  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

  const data = await response.json();

  return {
    props: {
      popularMovies: data,
    },
  };
}

export default Browse;
