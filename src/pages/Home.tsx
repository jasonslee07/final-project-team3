import Navbar from "../components/Navbar";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import type { User } from "../types/types";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";
import globe from "../assets/Sell4Impact_logo.png";
import text_logo from "../assets/Sell4Impact_text.png";

const Home = () => {
  /**
   * Define the useState variables to get current users and store data
   */
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Taken from Dashboard.tsx on week09 examples
   *
   * if the user isn't defined, don't move forward
   * if the user IS defined, get a reference to the user and set the data
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
          const data = snap.data() as User;
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

  /**
   * if a user want's to log out, let them log out :)
   * reload the page to re render the UI for the "/" page
   */
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.reload(); // refresh the page if the user logs out
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <>
      <Navbar />
      <div className="mt-30 mb-10 flex flex-col items-center gap-4">
        <h1 className="text-5xl flex text-[#40532D] items-center flex-col gap-x-4 gap-y-2 md:flex-row">
          <span>Welcome</span> <span>to</span>{" "}
          <span>
            <img width={200} height={100} src={text_logo} className="h-25 object-cover" alt="Sell4Impact" />
          </span>
        </h1>
        <h2 className="text-2xl flextext-[#40532D] mx-4">Where you can furnish your dorm for less!</h2>
        <img src={globe} width={200} alt="" />
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
              <Link to="/login" className="flex justify-center items-center py-4 bg-[#E2725C] text-white rounded-md hover:bg-[#e05135] hover:-translate-y-1 ease-in-out duration-100">
                Log In
              </Link>
            )}

            <Link
              to="/sign-up"
              className="flex justify-center items-center py-3 bg-white border-[#9DAF8B] border-4 rounded-md text-[#9DAF8B] hover:bg-[#82a95b] hover:border-[#82a95b] hover:text-white hover:-translate-y-1 ease-in-out duration-100"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
