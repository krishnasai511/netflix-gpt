import { useEffect } from "react";
import { OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getMovieVideos();
  }, []);

  async function getMovieVideos() {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      OPTIONS
    );
    const json = await data.json();
    const FilteredTrailer = json?.results?.find(
      (vid) => vid.type === "Trailer"
    );
    const trailer = FilteredTrailer || json.results[0];
    dispatch(addTrailerVideo(trailer));
  }
};

export default useMovieTrailer;
