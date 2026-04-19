import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import PageNotFound from "./components/PageNotFound";
import ClientProfile from "./pages/ClientProfile";
import VendorProfile from "./pages/VendorProfile";
import ItemPage from "./pages/ItemPage";
import ItemEditPage from "./pages/ItemEditPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import SettingsPage from "./pages/SettingsPage";
import OnboardingPage from "./pages/OnboardingPage";
import ClientDashboard from "./pages/ClientDashboard";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase/firebase";
import type { User } from "./types/backend-types";
import { useAuth } from "./context/AuthContext";
import CreateItemPage from "./pages/CreateItemPage";

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

  return isLoading ? (
    <>Loading...</>
  ) : (
    <>
      <BrowserRouter>
        <Routes>
          {/* Main Routes */}
          {userData ? <Route path="/" element={userData.role === "Client" ? <ClientProfile /> : <VendorProfile />}></Route> : <Route path="/" element={<Home />}></Route>}
          {userData ? <Route path="/login" element={<PageNotFound />}></Route> : <Route path="/login" element={<LoginPage />}></Route>}
          {userData ? <Route path="/sign-up" element={<PageNotFound />}></Route> : <Route path="/sign-up" element={<SignUpPage />}></Route>}
          {userData ? <Route path="/forgot-password" element={<PageNotFound />}></Route> : <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>}
          {currentUser && !userData ? <Route path="/onboarding" element={<OnboardingPage />}></Route> : <Route path="/onboarding" element={<PageNotFound />}></Route>}

          {/* Item Routes */}
          {userData ? <Route path="/create" element={userData.role === "Vendor" ? <CreateItemPage /> : <PageNotFound />}></Route> : <Route path="/create" element={<PageNotFound />}></Route>}
          {userData ? <Route path="/edit/:id" element={userData.role === "Vendor" ? <ItemEditPage /> : <PageNotFound />}></Route> : <Route path="/edit" element={<PageNotFound />}></Route>}
          {userData ? <Route path="/item/:id" element={<ItemPage />}></Route> : <Route path="/item" element={<PageNotFound />}></Route>}
          {userData ? <Route path="/vendor/:id" element={userData.role === "Vendor" ? <VendorProfile /> : <PageNotFound />}></Route> : <Route path="/vendor" element={<PageNotFound />}></Route>}

          {/* Navbar Routes */}
          {userData ? <Route path="/dashboard" element={<ClientDashboard />}></Route> : <Route path="/client-dashboard" element={<PageNotFound />}></Route>}
          {userData ? <Route path="/settings" element={<SettingsPage />}></Route> : <Route path="/settings" element={<PageNotFound />}></Route>}
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
