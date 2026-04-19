import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import ProfileHeader from "../components/ProfileHeader";
import ProfileTab from "../components/ProfileTab";
import { type ItemDate } from "../types/frontend-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import blanket from "../assets/throw-blanket.png";
import lamp from "../assets/salt-lamp.png";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

const dummyData: ItemDate = {
  day: 7,
  month: "April",
  year: 2026,
};

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
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    const fetchItems = async () => {
      const q = query(collection(db, "items"), where("vendorID", "==", currentUser.uid));
      const snapshot = await getDocs(q);
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<FetchedItem, "id">),
      }));
      setItems(fetched);
    };

    fetchItems();
  }, [currentUser]);

  const editItem = async () => {
    try {
      // youll probably have to pass in data like vendor ID
      navigate("/create-item");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Navbar />
      {/* <ProfileTab tab1="Items" tab2="Drafts" tab3="Sold" activeTab={activeTab} setActiveTab={setActiveTab} /> */}

      <ProfileHeader name={"sponge bob"} role={"Vendor"} desc={"5 items sold"} img={"/src/assests/profile-pic.png"} />

      <ProfileTab tab1={"Items"} tab2={"Drafts"} tab3={"Sold"} />

      <div className="min-h-screen bg-[#d3d6ba] flex flex-col gap-3 px-4 py-4">
        {items.map((item) => (
          <ItemCard key={item.id} itemId={item.id} title={item.title} price={item.price} img={item.img} category={item.category} role={"Vendor"} />
        ))}
      </div>

      {/* this makes the create item button always hover at the bottom of screen */}
      <button className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-10 py-3 bg-[#E2725B] text-white rounded-md hover:bg-[#d85f47] transition" onClick={editItem}>
        Create Item
      </button>
    </>
  );
};

export default VendorProfile;
