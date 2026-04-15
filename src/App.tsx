import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./components/PageNotFound";
import ClientProfile from "./pages/ClientProfile";
import VendorProfile from "./pages/VendorProfile";
import ItemPage from "./pages/ItemPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase/firebase";
import type { User } from "./types/backend-types";
import { signOut } from "firebase/auth";
import { useAuth } from "./context/AuthContext";
import { Link } from "react-router";

function App() {
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
    <>
      <BrowserRouter>
        <Routes>
          {userData ? (
            userData.role === "Client" ? (
              <Route path="/" element={<ClientProfile />}></Route>
            ) : (
              <Route path="/" element={<VendorProfile />}></Route>
            )
          ) : (
            <Route path="/" element={<Home />}></Route>
          )}
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
          <Route path="/client-profile" element={<ClientProfile />}></Route>
          <Route path="/vendor-profile" element={<VendorProfile />}></Route>
          <Route path="/item-page" element={<ItemPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
