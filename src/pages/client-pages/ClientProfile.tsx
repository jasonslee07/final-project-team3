import Navbar from "../../components/Navbar";
import ItemCard from "../../components/ItemCard";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileTab from "../../components/ProfileTab";
import { type ItemDate } from "../../types/frontend-types";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { collection, getDocs, query, where, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import type { User } from "../../types/backend-types";


const dummyData: ItemDate = {
  day: 7,
  month: "April",
  year: 2026,
};

const ClientProfile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { cart, removeFromCart } = useCart();

  const loadingUser : User = {
  
      firstName: "Loading...",
      lastName: "",
      email: "Loading...",
      profileImg: "",
      role: "Vendor"
  }
  
  const [userData, setUserData] = useState<User>(loadingUser);

  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const fetchUserData = async () => {

      try {
        const reference = doc(db, "users", currentUser.uid)
        const snapshot = await getDoc(reference);
        setUserData(snapshot.data() as User);
      }
      catch (error) {
        console.error("Error fetching user data: ", error);
      }
    }
    fetchUserData();
  }, [currentUser]);
  return (
    <>
      <Navbar />

      <ProfileHeader name={userData.firstName + " " + userData.lastName} role={"Client"} desc={"i fucked up backend types omg"} img={userData.profileImg} />

      <ProfileTab tab1={"Cart"} tab2={"Ordered"} tab3={"Past"} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="min-h-screen bg-[#c5cfa8] grid grid-cols-2 gap-3 px-4 py-4 items-start">

        {activeTab === 0 &&
          (cart.length === 0 ? (
            <p className="text-[#6b8f5e] text-sm col-span-2 text-center py-4">Your cart is empty!</p>
          ) : (
            cart.map((item, i) => (
              <ItemCard
                key={i}
                title={item.title}
                price={item.price}
                date={item.date}
                img={item.img}
                role="Client"
                category={item.category}
                showDelete={true}
                onDelete={() => removeFromCart(item.title)}
              />
            ))
          ))}
        {activeTab === 1 && <ItemCard title={"Ordered Item"} price={12.99} date={dummyData} img={"/src/assets/salt-lamp.png"} role={"Client"} category={"Wall"} />}
        {activeTab === 2 && <ItemCard title={"Past Item"} price={9.99} date={dummyData} img={"/src/assets/throw-blanket.png"} role={"Client"} category={"Floor"} />}
      </div>
    </>
  );
};

export default ClientProfile;
