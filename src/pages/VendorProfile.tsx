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

const VendorProfile = () => {

  return (
    <>

      <Navbar />

      <ProfileHeader
        name = {"sponge bob"}
        role = {"Vendor"}
        desc = {"5 items sold"}
        img = {"/src/assests/profile-pic.png"}
      />

      <ProfileTab
        tab1 = {"Items"}
        tab2 = {"Drafts"}
        tab3 = {"Sold"}
      />

      <div className="min-h-screen bg-[#d3d6ba] flex flex-col gap-3 px-4 py-4">
        <ItemCard
          title={"Blanket"}
          price={24.99}
          date={dummyData}
          img={"/src/assests/throw-blanket.png"}
          role={"Vendor"}
          category={"Desk"}
        />
        <ItemCard
          title={"Salt Lamp"}
          price={14.99}
          date={dummyData}
          img={"/src/assests/salt-lamp.png"}
          role={"Vendor"}
          category={"Bedroom"}
        />
      </div>

    </>
  );
};

export default VendorProfile;