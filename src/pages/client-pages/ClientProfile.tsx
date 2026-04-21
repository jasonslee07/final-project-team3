import Navbar from "../../components/Navbar";
import ItemCard from "../../components/ItemCard";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileTab from "../../components/ProfileTab";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, getDoc, doc, onSnapshot, updateDoc, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import type { Item, User, Order } from "../../types/types";

const ClientProfile = () => {
  const [activeTab, setActiveTab] = useState(0);

  // cart items coming from firestore, shud this be any[]???
  const [cartItems, setCartItems] = useState<Item[]>([]);

  // ordered items coming from firestore orders collection i made??
  const [orderedItems, setOrderedItems] = useState<Item[]>([]);

  // past or completed items coming from orders collection i made..
  const [pastItems, setPastItems] = useState<Item[]>([]);

  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total = total + cartItems[i].price;
  }
  const loadingUser: User = {
    firstName: "Loading...",
    lastName: "",
    email: "Loading...",
    desc: "Loading...",
    profileImg: "",
    role: "Client",
  };

  const [userData, setUserData] = useState<User>(loadingUser);

  const { currentUser } = useAuth();

  const fetchOrders = async () => {
    const orderedSnap = await getDocs(query(collection(db, "orders"), where("clientID", "==", currentUser.uid), where("status", "==", "Shipped")));
    setOrderedItems(orderedSnap.docs.map((d) => ({ ...d.data(), id: d.id })) as Item[]);

    const pastSnap = await getDocs(query(collection(db, "orders"), where("clientID", "==", currentUser.uid), where("status", "==", "Delivered")));
    setPastItems(pastSnap.docs.map((d) => ({ ...d.data(), id: d.id })) as Item[]);
  };

  useEffect(() => {
    if (!currentUser) return;

    // user profile (one-time fetch is fine here)
    const fetchUserData = async () => {
      const userSnap = await getDoc(doc(db, "users", currentUser.uid));
      if (userSnap.exists()) setUserData(userSnap.data() as User);
    };
    fetchUserData();

    // cart — live listener so deletes/adds reflect instantly
    const cartQuery = query(collection(db, "items"), where("status", "==", "Carted"), where("cartedBy", "==", currentUser.uid));

    const unsubscribeCart = onSnapshot(cartQuery, (snapshot) => {
      const fetchedCart = snapshot.docs.map((d) => ({ ...d.data(), id: d.id })) as Item[];
      setCartItems(fetchedCart);
    });

    // const orderQuery = query(collection(db, "orders"), where("clientID", "==", currentUser.uid));
    
   

    return () => { unsubscribeCart() }; // cleanup listener on unmount
  }, [currentUser]);

  const removeFromCart = async (itemId: string) => {
    if (!currentUser) return;
    try {
      await updateDoc(doc(db, "items", itemId), { status: "Active", cartedBy: null });
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handleCheckout = async () => {

    if (!currentUser || cartItems.length === 0) return;

    try {
      for (const item of cartItems) {
        const itemRef = doc(db, "items", item.id);
        await updateDoc(itemRef, { status: "Sold" });

        await addDoc(collection(db, "orders"), {
          itemID: item.id,
          clientID: currentUser.uid,
          vendorID: item.vendorID,
          status: "Shipped"
        });

        await fetchOrders();
        alert("Checkout successful!");
      }
    } catch (error) {
      console.error("Error handling checkout", error);
    }
  }

  return (
    <>
      <Navbar />

      <ProfileHeader name={userData.firstName + " " + userData.lastName} role={"Client"} desc={userData.desc} img={userData.profileImg} />

      <ProfileTab tab1={"Cart"} tab2={"Ordered"} tab3={"Past"} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="min-h-screen bg-[#c5cfa8] grid grid-cols-2 gap-3 px-4 py-4 items-start">
        {activeTab === 0 &&
          (cartItems.length === 0 ? (
            <p className="text-[#6b8f5e] text-sm col-span-2 text-center py-4">Your cart is empty!</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <ItemCard key={item.id} title={item.title} price={item.price} img={item.img} role="Client" category={item.category} showDelete={true} onDelete={() => removeFromCart(item.id)} />
              ))}

              <div className="col-span-2 bg-[#FFFCF3] py-6 flex flex-col items-center">
                <p className="text-md text-[#40532D] underline">Total</p>
                <p className="text-3xl text-[#7E9169]">${total.toFixed(2)}</p>
              </div>

              <div className="col-span-2 flex justify-center py-2">
                <button className="bg-[#E2725C] text-white text-md px-16 py-4 rounded-md" onClick={handleCheckout}>Checkout</button>
              </div>
            </>
          ))}
        {activeTab === 1 &&
          (orderedItems.length === 0 ? (
            <p className="text-[#6b8f5e] text-sm col-span-2 text-center py-4">No ordered items yet.</p>
          ) : (
            orderedItems.map((item) => <ItemCard key={item.id} title={item.title} price={item.price} img={item.img} role="Client" category={item.category} />)
          ))}

        {activeTab === 2 &&
          (pastItems.length === 0 ? (
            <p className="text-[#6b8f5e] text-sm col-span-2 text-center py-4">No past items yet.</p>
          ) : (
            pastItems.map((item) => <ItemCard key={item.id} title={item.title} price={item.price} img={item.img} role="Client" category={item.category} />)
          ))}
      </div>
    </>
  );
};

export default ClientProfile;
