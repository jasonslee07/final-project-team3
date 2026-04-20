import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import ProfileHeader from "../components/ProfileHeader";
import ProfileTab from "../components/ProfileTab";
import { type ItemDate } from "../types/frontend-types";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const dummyData: ItemDate = {
  day: 7,
  month: "April",
  year: 2026
}

const ClientProfile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { cart, removeFromCart } = useCart();

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].price;
  }

  return (
    <>
      <Navbar />

      <ProfileHeader
        name={"sponge bob"}
        role={"Client"}
        desc={"Member since 2006 | 5 items bought"}
        img={"/src/assets/profile-pic.png"}
      />

      <ProfileTab
        tab1={"Cart"}
        tab2={"Ordered"}
        tab3={"Past"}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="min-h-screen bg-[#c5cfa8] grid grid-cols-2 gap-3 px-4 py-4 items-start">
        {activeTab === 0 && (
          cart.length === 0
             ? <p className="text-[#6b8f5e] text-sm col-span-2 text-center py-4">Your cart is empty!</p>
            : <>
                {cart.map((item, i) => (
                  <ItemCard key={i} title={item.title} price={item.price} date={item.date} img={item.img} role="Client" category={item.category} showDelete={true} onDelete={() => removeFromCart(item.title)} />
                ))}
 
                <div className="col-span-2 bg-[#FFFCF3] py-6 flex flex-col items-center">
                  <p className="text-md text-[#40532D] underline">Total</p>
                  <p className="text-3xl text-[#7E9169]">${total.toFixed(2)}</p>
                </div>
 
                <div className="col-span-2 flex justify-center py-2">
                  <button className="bg-[#E2725C] text-white text-md px-16 py-4 rounded-md">
                    Checkout
                  </button>
                </div>
              </>
        )}
        {activeTab === 1 && (
          <ItemCard title={"Ordered Item"} price={12.99} date={dummyData} img={"/src/assets/salt-lamp.png"} role={"Client"} category={"Wall"} />
        )}
        {activeTab === 2 && (
          <ItemCard title={"Past Item"} price={9.99} date={dummyData} img={"/src/assets/throw-blanket.png"} role={"Client"} category={"Floor"} />
        )}
      </div>
    </>
  );
};

export default ClientProfile;