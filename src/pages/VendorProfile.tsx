import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import ProfileHeader from "../components/ProfileHeader";
import ProfileTab from "../components/ProfileTab";
import { type ItemDate } from "../types/frontend-types";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {db} from "../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const dummyData: ItemDate = {
  day: 7,
  month: "April",
  year: 2026,
};

const VendorProfile = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Navbar />
      <ProfileHeader
        name="Sponge Bob"
        role="Vendor"
        desc="5 items sold"
        img="/src/assets/profile-pic.png"
      />
      <ProfileTab tab1="Items" tab2="Drafts" tab3="Sold" activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="min-h-screen bg-[#c5cfa8] grid grid-cols-2 gap-3 px-4 py-4 items-start">
        {activeTab === 0 && (
          <ItemCard title="Blanket" price={24.99} date={dummyData} img="/src/assets/throw-blanket.png" role="Vendor" category="Desk" />
        )}
        {activeTab === 1 && (
          <ItemCard title="Draft Item" price={9.99} date={dummyData} img="/src/assets/throw-blanket.png" role="Vendor" category="Wall" />
        )}
        {activeTab === 2 && (
          <ItemCard title="Sold Item" price={14.99} date={dummyData} img="/src/assets/salt-lamp.png" role="Client" category="Bed" />
        )}
      </div>
    </>
  );
};

export default VendorProfile;