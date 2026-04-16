import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { signOut } from "firebase/auth";
import type { User } from "../types/backend-types";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faHouse } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  /**
   * if a user want's to log out, let them log out :)
   * reload the page to re render the UI for the "/" page
   */
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
  return (
    <nav className="flex justify-between bg-linear-to-b from-[#AABA99] to-[#9EAF8C]">
      {userData?.role === "Vendor" ? (
        <div className="text-xl text-[#E2725B] bg-white m-2 px-8 py-2 rounded-lg">Sell4Impact</div>
      ) : (
        <a href="/" className="text-xl text-[#E2725B] bg-white m-2 px-8 py-2 rounded-lg">
          Sell4Impact
        </a>
      )}
      {userData ? (
        <div className="flex items-center gap-2">
          <Link to="/" className="">
            <FontAwesomeIcon icon={faHouse} size="2x" fill="white" className="hover:-translate-y-1" />
          </Link>
          <Link to="/settings" className="">
            <FontAwesomeIcon icon={faCircleUser} size="2x" fill="white" className="hover:-translate-y-1" />
          </Link>
          <Link to="/">
            <div className="flex justify-center items-center m-2 px-8 py-2 bg-[#E2725C] hover:bg-[#e26047] hover:-translate-y-1 ease-in-out duration-100 text-white rounded-md" onClick={handleLogout}>
              {" "}
              Log Out{" "}
            </div>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </nav>
  );
};

export default Navbar;
