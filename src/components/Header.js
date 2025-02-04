import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUserSignedIn = useSelector((store) => store.user);
  const isGptVisible = useSelector((store) => store.gpt.showGptSearch);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse"); // it always redirect here:: HAS TO BE FIXED
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      // for unsubsrcibing when component unmounts
      unsubscribe();
    };
  }, []);

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign out completed");
      })
      .catch((error) => {
        console.log("error in signing out user");
      });
  }

  function handleGptSearch() {
    dispatch(toggleGptSearchView());
  }

  function handleLanguageChange(e) {
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className="absolute w-full py-2 px-5 bg-gradient-to-b from-black z-10 flex flex-col justify-between md:flex-row">
      <img
        className="w-36 md:m-2 mx-auto"
        src="/Netflix_Logo_CMYK.png"
        alt="logo"
      />
      {isUserSignedIn && (
        <div className="flex items-center">
          {isGptVisible && (
            <select
              className="py-2 px-4 m-2 font-bold rounded-md"
              onChange={(e) => handleLanguageChange(e)}
            >
              {SUPPORTED_LANGUAGES.map((language) => (
                <option key={language.identifier} value={language.identifier}>
                  {language.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="bg-gray-100 rounded-md px-4 py-2 font-bold"
            onClick={handleGptSearch}
          >
            {!isGptVisible ? "GPT Search" : "Home"}
          </button>
          <img
            className="w-12 h-12 m-2 p-2"
            src={USER_AVATAR}
            alt="signout-icon"
          />
          <button className="font-bold text-white" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
