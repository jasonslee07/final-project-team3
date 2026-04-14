import { useState } from "react";
import Navbar from "../components/Navbar";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import type { UserData, UserRole } from "../types/types";
import { Link, useNavigate } from "react-router";

const SignUpPage = () => {
  const [isClient, setIsClient] = useState<boolean>(true);
  const [isVendor, setIsVendor] = useState<boolean>(false);
  const [role, setRole] = useState<UserRole>("Client");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  function handleClick() {
    setIsClient(!isClient);
    setIsVendor(!isVendor);

    setRole(role === "Client" ? "Vendor" : "Client");
  }

  const handleAuth = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const defaultData: UserData = {
        role: role,
        firstName: firstName,
        lastName: lastName,
        email: email,
      };
      await setDoc(doc(db, "users", userCred.user.uid), defaultData);
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
          <h1 className="text-3xl text-[#E2725B] mt-8 mb-4 flex justify-center">Sign up</h1>
          <div className="bg-linear-to-b from-[#EAECDC] to-[#D3D6BA] w-full border-t-8 flex-1 border-[#E2725B] flex flex-col pt-10 items-center">
            <form action="" className="flex flex-col justify-center items-center w-90 gap-8">
              <div className="flex gap-10">
                <button type="button" className={`text-2xl px-8 py-2 rounded-2xl ${isClient ? "bg-[#A8B897]" : "bg-white"}`} onClick={handleClick}>
                  Client
                </button>
                <button type="button" className={`text-2xl px-8 py-2 rounded-2xl ${isVendor ? "bg-[#A8B897]" : "bg-white"}`} onClick={handleClick}>
                  Vendor
                </button>
              </div>
              <p className="text-xl text-[#40532D]">I want to join as a...</p>
              <input
                type="text"
                placeholder="First Name"
                required
                className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA] focus:text-[#AABA99]"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                required
                className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA] focus:text-[#AABA99]"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input type="email" placeholder="Email" required className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA]" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input
                type="password"
                placeholder="Password"
                required
                className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="py-3 bg-[#E2725C] text-white rounded-md w-full" onClick={handleAuth}>
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
