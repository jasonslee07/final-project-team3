import Navbar from "../components/Navbar";

// TODO

/*
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import type { UserData } from "../types/types";
import { Link, useNavigate } from "react-router";
*/

const LoginPage = () => {

  // TODO
  
  /*
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      
    } catch (error) {
      console.log(error);
    }
  };
  */


  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-col flex-1">
          <h1 className="text-3xl text-[#E2725B] mt-8 mb-4 flex justify-center">Login Page!</h1>
          <div className="bg-linear-to-b from-[#EAECDC] to-[#D3D6BA] w-full border-t-8 flex-1 border-[#E2725B] flex flex-col pt-10 items-center">
            <form action="" className="flex flex-col justify-center items-center w-90 gap-8">
              <input type="email" placeholder="Email" required className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA]" />
              <input type="password" placeholder="Password" required className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA]" />
              <button type="submit" className="py-3 bg-[#E2725C] text-white rounded-md w-full">
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
