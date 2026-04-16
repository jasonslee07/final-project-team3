import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { updatePassword } from "firebase/auth";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const SettingsPage = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // pre load the user's first name and last name so the user knows whats being stored
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userSnap = await getDoc(doc(db, "users", user.uid));
        if (userSnap.exists()) {
          const data = userSnap.data();
          setFirstName(data.firstName);
          setLastName(data.lastName);
        }
      }
    };
    fetchUserData();
  }, []);

  // if the user updates the data, update the firebase to have new data
  const handleUpdate = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("No user logged in");
      return;
    }

    try {
      // 1. Update Firestore Document (Names)
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        firstName: firstName,
        lastName: lastName,
      });
      await updatePassword(user, password);

      // console.log("User details updated Successfully"); // used for debugging
    } catch (error: any) {
      console.error("Error modifying data: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#d3d6ba] flex flex-col gap-3 px-4 py-4">
        <div>Settings Page</div>
        <input
          type="text"
          placeholder="First Name"
          className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA] focus:text-[#AABA99]"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA] focus:text-[#AABA99]"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input type="password" placeholder="Password" className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA]" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" className="py-3 bg-[#E2725C] text-white rounded-md w-full hover:bg-[#e05135] hover:-translate-y-1 ease-in-out duration-100" onClick={handleUpdate}>
          Save Changes
        </button>
      </div>
    </>
  );
};

export default SettingsPage;
