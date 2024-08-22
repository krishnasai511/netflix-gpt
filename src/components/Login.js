import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  function toggleSignInForm() {
    setIsSignInForm(!isSignInForm);
    console.log("Sign In Form-->", isSignInForm);
  }

  function handleBtnClick() {
    //Validate the form data

    if (!isSignInForm && !name.current.value) {
      return setErrorMsg("Enter a valid name");
    }
    setErrorMsg(checkValidData(email.current.value, password.current.value));
  }

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/b58c77e5-b2f6-4eaf-8352-fe8236c9d3f0/3e4e726c-ed2a-472c-94fa-b6c8880b7da2/US-en-20240820-TRIFECTA_GLOBAL_FALLBACK-perspective_WEB_2e8a07bd-505c-4bc0-9503-81884f6b5bcb_large.jpg"
          alt="background"
        />
      </div>
      <div>
        <form
          onSubmit={(e) => e.preventDefault()}
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
