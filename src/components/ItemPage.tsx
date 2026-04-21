import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaShoppingCart } from "react-icons/fa";
import Navbar from "./Navbar";
import { useCart } from "../context/CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { type Item, type User } from "../types/types";
import PageNotFound from "./PageNotFound";

const ItemPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [item, setItem] = useState<Item | null>(null);

  const [vendor, setVendor] = useState<User | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchItemAndVendor = async () => {
      const ref = doc(db, "items", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const itemData = { id: snap.id, ...snap.data() } as unknown as Item;
        setItem(itemData);

        if (itemData.vendorID) {
          const vendorRef = doc(db, "users", itemData.vendorID);
          const vendorSnap = await getDoc(vendorRef);
          
          if (vendorSnap.exists()) {
            setVendor(vendorSnap.data() as User);
          }
        }
      }
    };
    fetchItemAndVendor();
  }, [id]);

  return item ? (
    <div className="min-h-screen bg-[#e8ead8] flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col px-10 py-8 gap-6">
        <div className="flex items-center gap-3">
          <FaChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" color="#8fac7f" size={18} />
          <h1 className="text-[#40532d] font-bold text-2xl">{item.title}</h1>
        </div>

        <div className="flex gap-6 flex-1">
          <div className="flex-1 rounded-md overflow-hidden border-4 border-white shadow-sm">
            <img src={item.img} alt="Pink faux fur throw blanket" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 bg-white rounded-md p-6 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="bg-[#8fac7f] text-white font-bold text-base px-4 py-2 rounded-md">${item.price}</span>
              <div
                onClick={() => {
                  addToCart(item);
                  setAdded(true);
                }}
                className="w-10 h-10 bg-[#e2725b] rounded-md flex items-center justify-center cursor-pointer"
              >
                <FaShoppingCart color="white" size={16} />
              </div>
              {added && <p className="text-[#6b8f5e] text-xs">Added to cart!</p>}
            </div>

            <span className="bg-[#eaecdc] text-[#7e9169] text-xs font-semibold px-3 py-1 rounded-md self-start">Bedding</span>

            <p className="text-[#40532d] text-sm leading-relaxed">{item.desc}</p>

            <div className="flex items-center justify-between bg-[#8fac7f] text-white rounded-md px-4 py-3 mt-auto">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#e2725b] flex items-center justify-center text-xs font-bold overflow-hidden">
                  {vendor?.profileImg ? (
                    <img src={vendor.profileImg} className="w-full h-full object-cover" />
                  ) : (
                    "V"
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold">{vendor ? vendor.firstName + " " + vendor.lastName : "Loading..."}</span>
                  <span className="text-xs text-white/70">{vendor?.desc || "No description provided"}</span>
                </div>
              </div>
              <FaChevronRight size={12} color="white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <PageNotFound />
  );
};

export default ItemPage;
