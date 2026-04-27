import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import { FaSearch } from "react-icons/fa";
import { type Item } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Item[]>();
  const [query, setQuery] = useState("");

  // const { currentUser } = useAuth();

  useEffect(() => {
    const itemDB = collection(db, "items");

    const unsubscribe = onSnapshot(itemDB, (snapshot) => {
      const itemData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Item[];

      setItems(itemData);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // update based on search filter
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredItems = items?.filter((item) => item.status === "Active" && (item.title.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase())));

  return isLoading ? (
    <Loading></Loading>
  ) : (
    <div className="min-h-screen bg-[#c5cfa8]">
      <Navbar />

      {/* Hero */}
      <div className="bg-[#f5f0e8] px-6 pt-10 pb-4 flex flex-col items-center gap-4">
        <h1 className="text-[#40532d] text-3xl font-bold text-center">Furnish your dorm for less.</h1>

        {/* Search bar */}
        <div className="flex items-center gap-2 border-2 border-[#e2725b] rounded-full px-4 py-2 w-full max-w-md bg-white">
          <FaSearch color="#e2725b" size={14} />
          <input
            type="text"
            placeholder="Search — Wall | Floor | Bed | Desk | Other"
            className="flex-1 outline-none bg-transparent text-sm text-stone-400 placeholder:text-stone-300"
            onChange={handleChange}
            value={query}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="h-1 bg-[#e2725b]" />

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 px-4 py-4 sm:grid-cols-4">
        {filteredItems && filteredItems.length > 0 ? (
          filteredItems.map((item, i) => (
            <div key={i} onClick={() => navigate(`/item/${item.id}`)} className="bg-[#f5f0e8] rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
              <div className="w-full aspect-square overflow-hidden bg-stone-100 relative">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-white text-[#e2725b] text-[10px] font-bold px-2 py-0.5 rounded-md">${item.price.toFixed(2)}</div>
              </div>
              <div className="h-1 bg-[#e2725b]" />
              <div className="px-2 py-2 flex flex-col gap-1">
                <p className="text-[#40532d] text-xs font-semibold line-clamp-1">{item.title}</p>
                <span className="bg-[#eaecdc] text-[#7e9169] text-[10px] font-semibold px-2 py-0.5 rounded-md self-start capitalize">{item.category}</span>
              </div>
            </div>
          ))
        ) : (
          <>No Items Found</>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
