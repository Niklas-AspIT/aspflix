import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import MovieSection from "../components/MovieSection";
import useAuth from "../lib/useAuth";
import Style from "../styles/Browse.module.scss";
import { CgDanger } from "react-icons/cg";
import { BsPlayCircleFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

interface BrowseProps {
  popularMovies: { [key: string]: any };
  topMovies: { [key: string]: any };
}

const Browse: NextPage<BrowseProps> = ({ popularMovies, topMovies }) => {
  const [showFeatured, showFeaturedSet] = useState(false);
  const [showTrailer, showTrailerSet] = useState(false);
  const [featuredMovie] = useState(
    popularMovies.results[
      Math.floor(Math.random() * popularMovies.results.length)
    ]
  );
  const router = useRouter();
  const auth = useAuth();

  const modalRef = useRef<HTMLDivElement | null>(null);
  const movieRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showFeatured) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "initial";
    }
  }, [showFeatured]);

  useEffect(() => {
    // Check if theres a click outside the target
    const handleClickOutside = (event: any) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        movieRef.current &&
        !movieRef.current.contains(event.target)
      ) {
        showFeaturedSet(false);
        showTrailerSet(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

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
      <div className={Style.browse}>
        {showFeatured && (
          <div className={Style.modal}>
            <div
              ref={modalRef}
              className={Style.modal__content}
              style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${
                  IMAGE_URL + featuredMovie.backdrop_path
                })`,
              }}
            >
              <strong className={Style.content__title}>
                {featuredMovie.title}
              </strong>
              <small className={Style.content__date}>
                {featuredMovie.release_date}
              </small>

              {showTrailer && (
                <iframe
                  style={{ marginTop: "0.5rem" }}
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/NZrX_ES93JA"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}

              <p className={Style.content__adult}>
                {featuredMovie.adult && (
                  <>
                    Adult <CgDanger />
                  </>
                )}
              </p>

              <div
                className={Style.content__trailer}
                onClick={() => showTrailerSet((s) => !s)}
              >
                {showTrailer ? (
                  <>
                    <AiFillCloseCircle /> Close trailer
                  </>
                ) : (
                  <>
                    <BsPlayCircleFill /> Play trailer
                  </>
                )}
              </div>

              <p className={Style.content__rating}>
                Rating: <span>{featuredMovie.vote_average}</span>
              </p>
              <p className={Style.content__overview}>
                {featuredMovie.overview}
              </p>
            </div>
          </div>
        )}
        <div
          className={Style.browse__featured}
          ref={movieRef}
          onClick={() => showFeaturedSet(true)}
        >
          <Image
            layout="fill"
            src={`${IMAGE_URL}/${featuredMovie.backdrop_path}`}
            alt="Movie poster"
            objectFit="cover"
            style={{ zIndex: "-1" }}
            priority={true}
          />
          <h2 className={Style.featured__title}>{featuredMovie.title}</h2>
        </div>
        <MovieSection title="Popular movies" movies={popularMovies.results} />
        <MovieSection title="Top rated movies" movies={topMovies.results} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const API_KEY = process.env.API_KEY;
  const BASE_URL = "http://api.themoviedb.org/3";

  const popularResponse = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );

  const popularData = await popularResponse.json();

  const topResponse = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
  );

  const topData = await topResponse.json();

  return {
    props: {
      popularMovies: popularData,
      topMovies: topData,
    },
  };
}

export default Browse;
