import Navbar from "../../components/Navbar";
import ItemCard from "../../components/ItemCard";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileTab from "../../components/ProfileTab";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import type { User } from "../../types/backend-types";

const ClientProfile = () => {
  const [activeTab, setActiveTab] = useState(0);

  // cart items coming from Firestore
  const [cartItems, setCartItems] = useState<any[]>([]);

  // ordered items coming from Firestore orders collection
  const [orderedItems, setOrderedItems] = useState<any[]>([]);

  // past/completed items coming from Firestore orders collection
  const [pastItems, setPastItems] = useState<any[]>([]);

  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total = total + cartItems[i].price;
  }
  const loadingUser: User = {
    firstName: "Loading...",
    lastName: "",
    email: "Loading...",
    profileImg: "",
    role: "Client",
  };

  const [userData, setUserData] = useState<User>(loadingUser);

  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const fetchClientData = async () => {

      try {
        // get the logged in user's profile info
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data() as User);
        }

        // get everything currently in this user's cart
        const cartRef = collection(db, "users", currentUser.uid, "cart");
        const cartSnap = await getDocs(cartRef);

        const fetchedCart = cartSnap.docs.map((cartDoc) => ({
          id: cartDoc.id,
          ...cartDoc.data(),
        }));

        setCartItems(fetchedCart);

        // get items the user has ordered but not completed yet
        const orderedQuery = query(
          collection(db, "orders"),
          where("clientID", "==", currentUser.uid),
          where("status", "==", "Shipped"),
        );

        const orderedSnap = await getDocs(orderedQuery);

        const fetchedOrderedItems = orderedSnap.docs.map((orderDoc) => ({
          id: orderDoc.id,
          ...orderDoc.data(),
        }));

        setOrderedItems(fetchedOrderedItems);

        // get old/completed purchases
        const pastQuery = query(
          collection(db, "orders"),
          where("clientID", "==", currentUser.uid),
          where("status", "==", "Delivered"),
        );

        const pastSnap = await getDocs(pastQuery);

        const fetchedPastItems = pastSnap.docs.map((orderDoc) => ({
          id: orderDoc.id,
          ...orderDoc.data(),
        }));

        setPastItems(fetchedPastItems);
      } catch (error) {
        console.error("Error fetching client data:", error);
      } 
    };

    fetchClientData();
  }, [currentUser]);

  const removeFromCart = async (cartDocId: string) => {
    if (!currentUser) return;

    try {
      // deletes the item from users/{uid}/cart/{cartDocId}
      await deleteDoc(doc(db, "users", currentUser.uid, "cart", cartDocId));

      // update UI immediately after deleting from Firestore
      setCartItems((prev) => prev.filter((item) => item.id !== cartDocId));
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  return (
    <>
      <Navbar />

      <ProfileHeader
        name={userData.firstName + " " + userData.lastName}
        role={"Client"}
        desc={"i fucked up backend types omg"}
        img={userData.profileImg}
      />

      <ProfileTab
        tab1={"Cart"}
        tab2={"Ordered"}
        tab3={"Past"}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="min-h-screen bg-[#c5cfa8] grid grid-cols-2 gap-3 px-4 py-4 items-start">
        {activeTab === 0 &&
          (cartItems.length === 0 ? (
            <p className="text-[#6b8f5e] text-sm col-span-2 text-center py-4">
              Your cart is empty!
            </p>
          ) : (
            <>
              {cartItems.map((item) => (
                <ItemCard
                  key={item.id}
                  title={item.title}
                  price={item.price}
                  img={item.img}
                  role="Client"
                  category={item.category}
                  showDelete={true}
                  onDelete={() => removeFromCart(item.id)}
                />
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
          ))}
        {activeTab === 1 &&
          (orderedItems.length === 0 ? (
            <p className="text-[#6b8f5e] text-sm col-span-2 text-center py-4">
              No ordered items yet.
            </p>
          ) : (
            orderedItems.map((item, index) => (
              <ItemCard
                key={index}
                title={item.title}
                price={item.price}
                img={item.img}
                role="Client"
                category={item.category}
              />
            ))
          ))}

        {activeTab === 2 &&
          (pastItems.length === 0 ? (
            <p className="text-[#6b8f5e] text-sm col-span-2 text-center py-4">
              No past items yet.
            </p>
          ) : (
            pastItems.map((item, index) => (
              <ItemCard
                key={index}
                title={item.title}
                price={item.price}
                img={item.img}
                role="Client"
                category={item.category}
              />
            ))
          ))}
      </div>
    </>
  );
};

export default ClientProfile;
