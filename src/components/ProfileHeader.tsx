import { type ProfileInfo } from "../types/types";

const ProfileHeader = ({ name, role, desc, img }: ProfileInfo) => {
  return (
    <div className="flex items-center gap-4 bg-[#b5c9a6] px-6 py-5">
      <div className="w-16 h-16 rounded-full flex-shrink-0 border-2 border-[#c0392b] overflow-hidden shadow-sm">
        <img src={img} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-[#6b8f5e] font-bold text-lg leading-tight">
          {name}
          <span className="text-[#6b8f5e] font-normal"> | {role}</span>
        </p>
        <p className="text-stone-500 text-xs">⭐ {desc}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
