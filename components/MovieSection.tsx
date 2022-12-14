import Movie from "./Movie";
import Style from "../styles/MovieSection.module.scss";

interface MovieSectionProps {
  title: string;
  movies: { [key: string]: any }[];
}

const MovieSection = ({ title, movies }: MovieSectionProps) => {
  return (
    <section className={Style.section}>
      <strong className={Style.section__title}>{title}</strong>
      <div className={Style.section__movies}>
        {movies.map((movie) => {
          return (
            <Movie
              key={movie.id}
              poster={movie.poster_path}
              title={movie.title}
              overview={movie.overview}
              vote_average={movie.vote_average}
              release_date={movie.release_date}
              backdrop={movie.backdrop_path}
              adult={movie.adult}
            />
          );
        })}
      </div>
    </section>
  );
};

export default MovieSection;
