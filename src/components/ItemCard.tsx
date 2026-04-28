import { FaTrash, FaChevronRight } from "react-icons/fa";
import { type UserRole } from "../types/types";
import { useNavigate } from "react-router-dom";

interface ItemCardProps {
  title: string;
  price: number;
  img: string;
  category: string;
  itemId?: string;
  role: UserRole;
  showDelete?: boolean;
  onDelete?: () => void;
}

const ItemCard = ({ title, price, img, role, category, itemId, showDelete, onDelete }: ItemCardProps) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    if (role === "Vendor") {
      navigate(`/edit/${itemId}`);
    } else {
      navigate(`/item/${itemId}`);
    }
  };

  return (
    <div className="flex items-stretch w-full bg-[#fffcf3] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative w-28 h-28 flex-shrink-0 self-center m-3 rounded-lg overflow-hidden bg-stone-100">
        <img src={img} alt={title} className="w-full h-full object-cover" />
        {showDelete && (
          <button onClick={onDelete} className="absolute top-1 left-1 w-5 h-5 flex items-center justify-center bg-white rounded-sm shadow" aria-label="Delete item">
            <FaTrash size={10} color="#e2725b" />
          </button>
        )}
      </div>

      <div className="flex flex-col justify-center gap-1.5 flex-1 py-3 pr-2">
        <p className="text-[#40532d] font-semibold text-sm leading-tight line-clamp-1">{title}</p>

        <div className="flex flex-wrap gap-1">
          <span className="bg-[#e2725b] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">${price.toFixed(0)}</span>
          <span className="bg-[#eaecdc] text-[#7e9169] text-[10px] font-semibold px-2 py-0.5 rounded-md capitalize">{category}</span>
        </div>

        {/* <p className="text-[#6b8f5e] text-[10px]">
          Added {date.day} {date.month} {date.year}
        </p> */}

        <button className="mt-0.5 self-start flex items-center gap-1 bg-[#8fac7f] hover:bg-[#7a9669] text-white text-[10px] font-semibold px-3 py-1 rounded-md" onClick={handleEdit}>
          {role === "Vendor" ? "Edit Item Details" : "View Item Details"}
          <FaChevronRight size={8} />
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
