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
    <div className="min-h-screen bg-[#d7d4dd] flex justify-center py-6">
      <div className="w-[92%] max-w-6xl bg-[#dfe3cf] min-h-screen">
        <Navbar />

        <div className="h-7 bg-[#f6f3eb]" />

        <section className="bg-[#d9dcc9] px-14 py-8">
          <ProfileHeader
            name={"Name"}
            role={"Vendor"}
            desc={"4.6 avg rating | 5 items sold"}
            img={"../assets/profile-pic.png"}
          />
        </section>

        <section className="bg-[#f7f3eb] pt-8">
          <ProfileTab tab1={"Items"} tab2={"Drafts"} tab3={"Sold"} />
          <div className="mt-2 h-1 w-full bg-[#e6765b]" />
        </section>

        <section className="bg-[#dfe3cf] px-20 py-8">
          <div className="flex flex-col gap-8">
            <ItemCard
              title={"Salt lamp"}
              price={18}
              date={dummyData}
              img={"../assets/throw-blanket.png"}
              vendor={true}
            />
          </div>
        </section>
      </div>
    </div>
    

  );
};

export default VendorProfile;
