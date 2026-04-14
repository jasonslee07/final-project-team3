import { useState } from "react";
import { type Tabs } from "../types/frontend-types";

const ProfileTab = ({ tab1, tab2, tab3 }: Tabs) => {
  const [active, setActive] = useState(0);
  const tabs = [tab1, tab2, tab3];

  return (
    <div className="flex border-b-2 border-[#e2725b] bg-[#fffcf3]">
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={() => setActive(i)}
          className={`flex-1 py-3 text-sm font-semibold transition-colors duration-150 ${
            active === i ? "text-[#c0392b]" : "text-[#6b8f5e] hover:text-[#40532d]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ProfileTab;