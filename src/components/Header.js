import React from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();

  const isUserSignedIn = useSelector((store) => store.user);

  function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign out completed");
        navigate("/");
      })
      .catch((error) => {
        console.log("error in signing out user");
      });
  }

  return (
    <div className="absolute w-full py-2 px-5 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-36 m-2" src="/Netflix_Logo_CMYK.png" alt="logo" />
      {isUserSignedIn && (
        <div className="flex items-center">
          <img
            className="w-12 h-12 m-2 p-2"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
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
