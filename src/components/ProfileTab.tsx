const ProfileTab = ({ tab1, tab2, tab3, activeTab, setActiveTab }: { tab1: string; tab2: string; tab3: string; activeTab: number; setActiveTab: (i: number) => void }) => {
  const tabs = [tab1, tab2, tab3];

  return (
    <div className="flex border-b-2 border-[#c0392b] bg-white">
      {tabs.map((tab, i) => (
        <button
          key={i}
          onClick={() => setActiveTab(i)}
          className={`flex-1 py-3 text-sm font-semibold transition-colors duration-150 ${activeTab === i ? "text-[#c0392b]" : "text-stone-400 hover:text-stone-600"}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ProfileTab;
