import { type ProfileInfo } from "../types";

const ProfileHeader = ({ name, role, desc }: ProfileInfo) => {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="flex items-center gap-4 bg-[#d3d6ba] px-6 py-5">
      <div className="w-16 h-16 rounded-full flex-shrink-0 border-2 border-[#e2725b] bg-[#fffcf3] flex items-center justify-center shadow-sm">
        <span className="text-[#e2725b] font-bold text-xl">{initials}</span>
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-[#40532d] font-bold text-lg leading-tight">
          {name}
          <span className="text-[#6b8f5e] font-normal"> | {role}</span>
        </p>
        <p className="text-[#6b8f5e] text-xs">⭐ {desc}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;