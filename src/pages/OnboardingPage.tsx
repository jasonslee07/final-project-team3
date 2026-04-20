import { useState } from "react";
import Navbar from "../components/Navbar";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router";
import type { User, UserRole } from "../types/backend-types";

const OnboardingPage = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [role, setRole] = useState<UserRole>("Client");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.log("No authenticated user found. Please sign in again.");
      navigate("/login");
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      console.log("Please fill in both your first and last name.");
      return;
    }

    setLoading(true);
    try {
      const userData: User = {
        role,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: user.email ?? "",
        desc: "",
        profileImg: user.photoURL ?? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      };
      await setDoc(doc(db, "users", user.uid), userData);
      navigate("/");
      window.location.reload();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-col flex-1">
        <h1 className="text-3xl text-[#E2725B] mt-8 mb-4 flex justify-center">Onboarding user...</h1>
        <div className="bg-linear-to-b from-[#EAECDC] to-[#D3D6BA] w-full border-t-8 flex-1 border-[#E2725B] flex flex-col pt-10 items-center">
          <div className="flex flex-col justify-center items-center w-90 gap-8">
            <p className="text-xl text-[#40532D]">I want to join as a...</p>
            <div className="flex gap-10">
              <button type="button" className={`text-2xl px-8 py-2 rounded-2xl ${role === "Client" ? "bg-[#A8B897]" : "bg-white"}`} onClick={() => setRole("Client")}>
                Client
              </button>
              <button type="button" className={`text-2xl px-8 py-2 rounded-2xl ${role === "Vendor" ? "bg-[#A8B897]" : "bg-white"}`} onClick={() => setRole("Vendor")}>
                Vendor
              </button>
            </div>

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
            <button
              type="button"
              disabled={loading}
              className="py-3 bg-[#E2725C] text-white rounded-md w-full hover:bg-[#e05135] hover:-translate-y-1 ease-in-out duration-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              onClick={handleSubmit}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
