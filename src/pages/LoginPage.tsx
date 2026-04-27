/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Navbar from "../components/Navbar";

import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithGoogle } from "../firebase/firebase";
import { auth, db } from "../firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  // let the user log in and navigate to the page
  const handleAuth = async () => {
    try {
      // console.log("Trying to log in user"); // used for debugging
      await signInWithEmailAndPassword(auth, email, password);
      // console.log("Logged in!"); // used for debugging
      navigate("/");
      window.location.reload();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const userCred = await signInWithGoogle();
      // Check if a user already exists with the login
      const userDoc = await getDoc(doc(db, "users", userCred.uid));
      // if the user doesn't exist, onboard the user, ohterwise display the data
      if (!userDoc.exists()) {
        // console.log("Onboarding User...") // used for debugging
        navigate("/onboarding");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-col flex-1">
          <h1 className="text-3xl text-[#E2725B] mt-8 mb-4 flex justify-center -translate-y-[8px]">Login Page!</h1>
          <div className="bg-linear-to-b from-[#EAECDC] to-[#D3D6BA] w-full border-t-8 flex-1 border-[#E2725B] flex flex-col pt-10 items-center">
            <form action="" className="flex flex-col justify-center items-center w-90 gap-8">
              <input type="email" placeholder="Email" required className="py-3 px-4 border w-full bg-white rounded-md text-[#40532D]" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input
                type="password"
                placeholder="Password"
                required
                className="py-3 px-4 border w-full bg-white rounded-md text-[#40532D]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="font-bold py-3 px-10 w-full bg-white border border-gray-300 text-gray-700 rounded-md  hover:bg-gray-100 hover:text-black hover:-translate-y-0.5 ease-in-out duration-100 flex items-center justify-center gap-2"
                onClick={handleGoogleAuth}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-6">
                  <path
                    fill="#fff"
                    d="M44.59 4.21a63.28 63.28 0 004.33 120.9 67.6 67.6 0 0032.36.35 57.13 57.13 0 0025.9-13.46 57.44 57.44 0 0016-26.26 74.33 74.33 0 001.61-33.58H65.27v24.69h34.47a29.72 29.72 0 01-12.66 19.52 36.16 36.16 0 01-13.93 5.5 41.29 41.29 0 01-15.1 0A37.16 37.16 0 0144 95.74a39.3 39.3 0 01-14.5-19.42 38.31 38.31 0 010-24.63 39.25 39.25 0 019.18-14.91A37.17 37.17 0 0176.13 27a34.28 34.28 0 0113.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0087.2 4.59a64 64 0 00-42.61-.38z"
                  />
                  <path
                    fill="#e33629"
                    d="M44.59 4.21a64 64 0 0142.61.37 61.22 61.22 0 0120.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 00-13.64-8 37.17 37.17 0 00-37.46 9.74 39.25 39.25 0 00-9.18 14.91L8.76 35.6A63.53 63.53 0 0144.59 4.21z"
                  />
                  <path fill="#f8bd00" d="M3.26 51.5a62.93 62.93 0 015.5-15.9l20.73 16.09a38.31 38.31 0 000 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 01-5.5-40.9z" />
                  <path
                    fill="#587dbd"
                    d="M65.27 52.15h59.52a74.33 74.33 0 01-1.61 33.58 57.44 57.44 0 01-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0012.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z"
                  />
                  <path
                    fill="#319f43"
                    d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0044 95.74a37.16 37.16 0 0014.08 6.08 41.29 41.29 0 0015.1 0 36.16 36.16 0 0013.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 01-25.9 13.47 67.6 67.6 0 01-32.36-.35 63 63 0 01-23-11.59A63.73 63.73 0 018.75 92.4z"
                  />
                </svg>
                Log In with Google
              </button>
              <button type="button" className="py-3 bg-[#E2725C] text-white rounded-md w-full hover:bg-[#e05135] hover:-translate-y-1 ease-in-out duration-100" onClick={handleAuth}>
                Log in
              </button>
            </form>
            <a href="/forgot-password" className="text-[#40532D] underline mt-6">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
