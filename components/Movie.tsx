import Image from "next/image";
import Style from "../styles/Movie.module.scss";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

interface MovieProps {
  title: string;
  poster: string;
}

const Movie = ({ title, poster }: MovieProps) => {
  return (
    <div className={Style.movie}>
      <Image
        alt={title + " poster"}
        width={300}
        height={450}
        src={IMAGE_URL + poster}
      ></Image>
    </div>
  );
};

export default Movie;
