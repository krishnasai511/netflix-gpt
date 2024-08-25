import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {
  const preferredLanguage = useSelector(
    (store) => store.config.preferredLanguage
  );

  return (
    <div className="pt-[10%] px-[25%] w-full">
      <form className="bg-gray-400 grid grid-cols-12">
        <input
          type="text"
          className="px-5 py-5 m-2 col-span-10 focus:outline-none"
          placeholder={lang[preferredLanguage].gptSearchPlaceholder}
        />
        <button className="bg-red-600 px-5 py-2 m-5 rounded-md font-bold text-white col-span-2">
          {lang[preferredLanguage].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;
