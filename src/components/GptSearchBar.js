import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import geminiAI from "../utils/geminiAi";
import { OPTIONS } from "../utils/constants";
import { addGptMovieResults } from "../utils/gptSlice";

const GptSearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const preferredLanguage = useSelector(
    (store) => store.config.preferredLanguage
  );

  async function searchMovieTMDB(movie) {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&page=1`,
      OPTIONS
    );

    const json = await data.json();

    return json?.results;
  }

  async function handleGptSearchClick() {
    const prompt = `Act as Movie recommendation system and give some movies for the following query: "
      ${searchText.current.value} 
      " only give me 5 movies, just like the example ahead "RRR,TITANIC" do not give as following 1. 21 Jump Street
2. Airplane!
3. Bridesmaids
4. The Hangover 

just give in oneline with commas, don not add numbers example 1.
`;

    if (searchText.current.value) {
      /*
      CHATGPT OPEN AI CODE
      const chatCompletion = await client.chat.completions.create({
        messages: [{ role: "user", content: searchText.current.value }],
        model: "gpt-4o-mini",
      });
      console.log("chat results--->", chatCompletion.choices);
      */

      //GEMINI GOOGLE AI CODE && we can add shimmer ai when the results are being fetched
      const result = await geminiAI.generateContent(prompt);
      const response = await result.response;
      const movieSuggestionsAI = response.text().split(",");

      const promiseArray = movieSuggestionsAI.map((movie) =>
        searchMovieTMDB(movie)
      );
      const tmdbResults = await Promise.all(promiseArray);
      dispatch(
        addGptMovieResults({
          movieNames: movieSuggestionsAI,
          movieResults: tmdbResults,
        })
      );
    }
  }

  return (
    <div className="pt-[35%] md:pt-[10%] px-[25%] w-full">
      <form
        className="w-full bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="px-5 py-5 m-5 col-span-10 focus:outline-none"
          placeholder={lang[preferredLanguage].gptSearchPlaceholder}
        />
        <button
          className="bg-red-600 m-5 px-4 py-3 rounded-md font-bold text-white col-span-2"
          onClick={handleGptSearchClick}
        >
          {lang[preferredLanguage].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;
