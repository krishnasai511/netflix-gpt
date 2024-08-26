import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ title, poster_path }) => {
  if (!poster_path) return null;

  return (
    <div className="w-48 pr-5">
      <img src={IMG_CDN_URL + poster_path} alt="movie-poster" />
    </div>
  );
};

export default MovieCard;
