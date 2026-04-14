import { useState } from "react";
import Navbar from "../components/Navbar";

import { signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleAuth = async () => {
    try {
      console.log("Trying to log in user");
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in!");
      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-col flex-1">
          <h1 className="text-3xl text-[#E2725B] mt-8 mb-4 flex justify-center">Login Page!</h1>
          <div className="bg-linear-to-b from-[#EAECDC] to-[#D3D6BA] w-full border-t-8 flex-1 border-[#E2725B] flex flex-col pt-10 items-center">
            <form action="" className="flex flex-col justify-center items-center w-90 gap-8">
              <input type="email" placeholder="Email" required className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA]" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input
                type="password"
                placeholder="Password"
                required
                className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" className="py-3 bg-[#E2725C] text-white rounded-md w-full" onClick={handleAuth}>
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
