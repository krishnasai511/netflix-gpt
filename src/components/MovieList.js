import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log("Movies==>", movies);

  return (
    movies && (
      <div className="px-7 py-3 ">
        <h1 className="font-bold text-2xl py-4 text-white">{title}</h1>
        <div className="flex overflow-x-scroll">
          <div className="flex">
            {movies?.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.original_title}
                poster_path={movie.poster_path}
              />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default MovieList;
