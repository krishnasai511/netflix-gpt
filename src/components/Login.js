import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { IMG_BG_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  function toggleSignInForm() {
    setIsSignInForm(!isSignInForm);
  }

  function handleBtnClick() {
    //Validate the form data

    if (!isSignInForm && !name.current.value) {
      return setErrorMsg("Enter a valid name");
    }
    const msg = checkValidData(email.current.value, password.current.value);
    setErrorMsg(msg);

    if (msg) return;

    //signin/signup logic

    if (!isSignInForm) {
      //Signup logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName }));
            })
            .catch((error) => {
              setErrorMsg(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "" + errorMessage);
        });
    } else {
      //signin logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "" + errorMessage);
        });
    }
  }

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={IMG_BG_URL} alt="background" />
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="absolute p-16 w-1/3 my-56 h-auto bg-black bg-opacity-80 mx-auto right-0 left-0 text-white flex flex-col"
        >
          <h1 className="font-bold text-3xl p-2 m-2">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              className="p-3 my-3 bg-gray-700 rounded-md"
              type="text"
              placeholder="Full Name"
              ref={name}
            />
          )}
          <input
            ref={email}
            className="p-3 my-3 bg-gray-700 rounded-md"
            type="text"
            placeholder="Email Address"
          />
          <input
            ref={password}
            className="p-3 my-3 bg-gray-700 rounded-md"
            type="password"
            placeholder="Password"
          />
          {errorMsg && <p className="text-red-600 font-bold p-2">{errorMsg}</p>}
          <button
            className="p-3 my-3 bg-red-700 rounded-md"
            onClick={handleBtnClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="p-3 my-2 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to Netflix? Sign up Now"
              : "Already Registered? Sign In Now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
