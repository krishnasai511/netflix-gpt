import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUserSignedIn = useSelector((store) => store.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        navigate("/browse");
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

  return (
    <div className="absolute w-full py-2 px-5 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-36 m-2" src="/Netflix_Logo_CMYK.png" alt="logo" />
      {isUserSignedIn && (
        <div className="flex items-center">
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
