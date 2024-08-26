import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);

  if (!movieNames) return null;

  return (
    <div className="px-4 py-5 bg-black opacity-90 text-white mt-5">
      {movieNames.map((movie, index) => (
        <div>
          <MovieList key={movie} title={movie} movies={movieResults[index]} />
        </div>
      ))}
    </div>
  );
};
export default GptMovieSuggestions;
