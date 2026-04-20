import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaShoppingCart } from "react-icons/fa";
import Navbar from "./Navbar";
import { useCart } from "../context/CartContext";

const ItemPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <div className="min-h-screen bg-[#e8ead8] flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col px-10 py-8 gap-6">
        <div className="flex items-center gap-3">
          <FaChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" color="#8fac7f" size={18} />
          <h1 className="text-[#40532d] font-bold text-2xl">Pink faux fur throw blanket</h1>
        </div>

        <div className="flex gap-6 flex-1">
          <div className="flex-1 rounded-md overflow-hidden border-4 border-white shadow-sm">
            <img src="/src/assets/throw-blanket.png" alt="Pink faux fur throw blanket" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 bg-white rounded-md p-6 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="bg-[#8fac7f] text-white font-bold text-base px-4 py-2 rounded-md">$40</span>
              <div
                onClick={() => {
                  addToCart({
                    title: "Pink faux fur throw blanket",
                    price: 40,
                    date: { day: 7, month: "April", year: 2026 },
                    img: "/src/assets/throw-blanket.png",
                    role: "Client",
                    category: "Bedding",
                  });
                  setAdded(true);
                }}
                className="w-10 h-10 bg-[#e2725b] rounded-md flex items-center justify-center cursor-pointer"
              >
                <FaShoppingCart color="white" size={16} />
              </div>
              {added && <p className="text-[#6b8f5e] text-xs">Added to cart!</p>}
            </div>

            <span className="bg-[#eaecdc] text-[#7e9169] text-xs font-semibold px-3 py-1 rounded-md self-start">Bedding</span>

            <p className="text-[#40532d] text-sm leading-relaxed">Originally bought from Target. It's really fuzzy and easy to wash. I used it for one semester. Great for keeping warm.</p>

            <button onClick={() => navigate("/vendor-profile")} className="flex items-center justify-between bg-[#8fac7f] text-white rounded-md px-4 py-3 mt-auto">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#e2725b] flex items-center justify-center text-xs font-bold">V</div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold">Vendor Name</span>
                  <span className="text-xs text-white/70">⭐ 4.6 | 5 items sold</span>
                </div>
              </div>
              <FaChevronRight size={12} color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
