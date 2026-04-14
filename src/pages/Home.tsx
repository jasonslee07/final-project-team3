import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import type { UserData } from "../types/types";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router";

const Home = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Taken from Dashboard.tsx on week09 examples
   */
  useEffect(() => {
    if (!currentUser) {
      setIsLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const ref = doc(db, "users", currentUser.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data() as UserData;
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <>
      <Navbar />
      <div className="mt-30 mb-10 flex flex-col gap-4">
        <h1 className="text-5xl flex justify-center text-[#40532D]">Welcome to Sell4Impact{userData ? ` ${userData.firstName} ${userData.lastName}!` : "!"}</h1>
        <h2 className="text-2xl flex justify-center text-[#40532D]">Insert brand slogan here</h2>
      </div>
      <div className="py-16 bg-linear-to-b from-[#EAECDC] to-[#D3D6BA] flex justify-center items-center">
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-col gap-6 w-90">
            {userData ? (
              <>
                <button className="flex justify-center items-center py-4 bg-[#E2725C] text-white rounded-md" onClick={handleLogout}>
                  Log Out
                </button>
              </>
            ) : (
              <button className="flex justify-center items-center py-4 bg-[#E2725C] text-white rounded-md">
                <Link to="/login">{`Log In`}</Link>
              </button>
            )}

            <Link to="/sign-up" className="flex justify-center items-center py-3 bg-white border-[#9DAF8B] border-4 rounded-md text-[#9DAF8B]">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
