import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

function LoginOverlay() {
  const [loginCard, setLoginCard] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, login, error, isVisible, setIsVisible, setError } =
    useContext(AuthContext);

  const resetAll = () => {
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogInSubmit = async (e) => {
    e.preventDefault();
    if (email === "" && password === "") {
      console.log("Email:", email);
      setError("Email and password is required");
    } else if (email === "") {
      setError("Email is Required");
    } else if (password === "") {
      setError("Password is Required");
    } else {
      login(email, password);
      resetAll();
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (email === "" && password === "") {
      console.log("Email:", email);
      setError("Email and password is required");
    } else if (email === "") {
      setError("Email is Required");
    } else if (password === "") {
      setError("Password is Required");
    } else {
      if (password === confirmPassword) {
        signup(email, password);
        resetAll();
      } else {
        setError("both passwords should match");
      }
    }
  };

  return isVisible ? (
    <>
      {loginCard ? (
        <div className="fixed w-screen h-screen flex justify-center items-center bg-[#000000af] z-50">
          <div className="bg-white w-[400px] p-5 pb-20 rounded relative">
            <button
              className="close-btn absolute right-5"
              onClick={() => setIsVisible(false)}
            >
              <svg width="25px" height="25px" viewBox="0 0 1024 1024">
                <path d="M878.336 85.333l-366.336 366.315-366.336-366.315h-60.331v60.331l366.336 366.336-366.336 366.336v60.331h60.331l366.336-366.336 366.336 366.336h60.331v-60.331l-366.315-366.336 366.315-366.336v-60.331z"></path>
              </svg>
            </button>
            <form
              className="flex flex-col gap-4 justify-center items-center"
              onSubmit={handleLogInSubmit}
            >
              <div className="OLX-logo">
                <svg
                  width="70px"
                  height="70px"
                  viewBox="0 0 1024 1024"
                  data-aut-id="icon"
                  fillRule="evenodd"
                  fill="#012F34"
                >
                  <path d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Login</h1>
              {error && <p className="text-red-500">{error}</p>}
              <div className="w-full">
                <input
                  id="email_input_field"
                  name="email"
                  type="text"
                  placeholder="Email"
                  autoComplete="email"
                  className="w-full border border-[#012F34] rounded p-2 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="w-full">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full border border-[#012F34] rounded p-2 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <p>
                Don't have an account?{" "}
                <button
                  className="text-[#012F34]"
                  onClick={() => {
                    setLoginCard(false);
                  }}
                >
                  Sign Up
                </button>
              </p>
              <button
                type="submit"
                className="w-full bg-[#012F34] text-white py-2 rounded"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="fixed w-screen h-screen flex justify-center items-center bg-[#00000050] z-50">
          <div className="bg-white w-[400px] p-5 pb-20 rounded relative">
            <button
              className="close-btn absolute right-5"
              onClick={() => setIsVisible(false)}
            >
              <svg width="25px" height="25px" viewBox="0 0 1024 1024">
                <path d="M878.336 85.333l-366.336 366.315-366.336-366.315h-60.331v60.331l366.336 366.336-366.336 366.336v60.331h60.331l366.336-366.336 366.336 366.336h60.331v-60.331l-366.315-366.336 366.315-366.336v-60.331z"></path>
              </svg>
            </button>
            <form
              className="flex flex-col gap-4 justify-center items-center"
              onSubmit={handleSignUpSubmit}
            >
              <div className="OLX-logo">
                <svg
                  width="70px"
                  height="70px"
                  viewBox="0 0 1024 1024"
                  data-aut-id="icon"
                  fillRule="evenodd"
                  fill="#012F34"
                >
                  <path d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Sign up</h1>
              {error && <p className="text-red-500">{error}</p>}
              <div className="w-full">
                <input
                  id="email_input_field"
                  name="email"
                  type="text"
                  placeholder="Email"
                  className="w-full border border-[#012F34] rounded p-2 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="w-full">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full border border-[#012F34] rounded p-2 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="w-full">
                <input
                  name="cpassword"
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full border border-[#012F34] rounded p-2 outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              
              <p>
                Don't have an account?{" "}
                <button
                  className="text-[#012F34]"
                  onClick={() => {
                    setLoginCard(true);
                  }}
                >
                  Login
                </button>
              </p>
              <button
                type="submit"
                className="w-full bg-[#012F34] text-white py-2 rounded"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  ) : null;
}

export default LoginOverlay;
