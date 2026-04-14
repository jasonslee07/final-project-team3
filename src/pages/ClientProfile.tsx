import Navbar from "../components/Navbar";
import ItemCard from "../components/ItemCard";
import ProfileHeader from "../components/ProfileHeader"
import ProfileTab from "../components/ProfileTab"
import { type ItemDate } from "../types"; 

const dummyData: ItemDate = {
  day: 7,
  month: "April",
  year: 2026
}

const ClientProfile = () => {

  return (
    <>
      <Navbar />

      <ProfileHeader 
        name = {"sponge bob"}
        role = {"Client"}
        desc = {"Member since 2006 | 5 items bought"}
        img = {"../assets/profile-pic.png"}
      />

      <ProfileTab 
        tab1 = {"Cart"}
        tab2 = {"Ordered"}
        tab3 = {"Past"}
      />

      <div className="min-h-screen bg-[#d3d6ba] flex flex-col gap-3 px-4 py-4">

      <ItemCard   
        title={"Salt Lamp"}
        price={18}
        date={dummyData}
        img={"../assets/salt-lamp.png"}
        role={"Client"}
        category={"Desk"}
      />

      <ItemCard   
        title={"Salt Lamp"}
        price={18}
        date={dummyData}
        img={"../assets/salt-lamp.png"}
        role={"Client"}
        category={"Desk"}
      />
      </div>

      <h1 className="text-2xl font-bold flex justify-center">Client Profile!</h1>
    </>
  );
};

export default ClientProfile;
