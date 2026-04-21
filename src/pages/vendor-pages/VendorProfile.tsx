import Navbar from "../../components/Navbar";
import ItemCard from "../../components/ItemCard";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileTab from "../../components/ProfileTab";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { collection, getDocs, query, where, getDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";

import type { User } from "../../types/types";

type FetchedItem = {
  id: string;
  title: string;
  price: number;
  desc: string;
  category: string;
  img: string;
  vendorID: string;
  status: string;
};

const VendorProfile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [items, setItems] = useState<FetchedItem[]>([]);

  const loadingUser: User = {
    firstName: "Loading...",
    lastName: "",
    email: "Loading...",
    desc: "Loading...",
    profileImg: "",
    role: "Vendor",
  };

  const [userData, setUserData] = useState<User>(loadingUser);

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    const q = query(collection(db, "items"), where("vendorID", "==", currentUser.uid));
    const unsubscribeItems = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<FetchedItem, "id">),
      }));
      setItems(fetched);
    });

    const fetchUserData = async () => {
      try {
        const reference = doc(db, "users", currentUser.uid);
        const snapshot = await getDoc(reference);
        setUserData(snapshot.data() as User);
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();

    return () => { unsubscribeItems() };
  }, [currentUser]);

  const editItem = async () => {
    try {
      navigate("/create");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      <ProfileHeader name={userData.firstName + " " + userData.lastName} role={userData.role} desc={userData.desc} img={userData?.profileImg} />
      <ProfileTab tab1={"Items"} tab2={"Drafts"} tab3={"Sold"} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="min-h-screen bg-[#d3d6ba] flex flex-col gap-3 px-4 py-4">
        {items
          .filter((item) => {
            if (activeTab === 0) return item.status === "Active";
            if (activeTab === 1) return item.status === "Draft";
            if (activeTab === 2) return item.status === "Sold";
          })
          .map((item) => (
            <ItemCard key={item.id} itemId={item.id} title={item.title} price={item.price} img={item.img} category={item.category} role={"Vendor"} />
          ))}
      </div>
      {/* this makes the create item button always hover at the bottom of screen */}
      <button className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-10 py-3 bg-[#E2725B] text-white rounded-md hover:bg-[#d85f47] transition" onClick={editItem}>
        Create Item
      </button>{" "}
    </>
  );
};

export default VendorProfile;
