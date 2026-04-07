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

      <ProfileHeader  // you can delete this, i just put it here so it would stop giving error
        name = {"sponge bob"}
        role = {"Vendor"}
        desc = {"5 items sold"}
        img = {"../assests/profile-pic.png"}
      />

      <ProfileTab // you can delete this, i just put it here so it would stop giving error
        tab1 = {"Items"}
        tab2 = {"Drafts"}
        tab3 = {"Sold"}
      />

      <ItemCard // you can delete this, i just put it here so it would stop giving error
        title={"Blanket"}
        price={24.99}
        date={dummyData}
        img={"../assests/throw-blanket.png"}
        vendor={true}
      />

      {
      /*
        PAGE GOAL:
        This page is the vendor profile page. It should show the vendor's
        information and the items they are selling or managing.

        Based on the design, this page should include:
        1. A profile header section
           - profile picture placeholder
           - vendor name
           - role label (Vendor)
           - seller rating / seller info text

        2. A navigation/tab section
           - Items
           - Drafts
           - Sold

        3. A product display section
           - show listed items
           - each item card should eventually show:
             * image
             * price
             * item title

        TODO:
        - Build the header section based on the figma
        - Add placeholder seller image/profile circle
        - Add tabs for Items, Drafts, and Sold
        - Highlight the active tab (can be static for now)
        - Add a listings section underneath the tabs
        - Can use mock data for now!

        NOTES:
        - Focus on frontend and the UI only!
        - Do not implement full edit/delete functionality yet
        - Do not connect to Firestore yet
        - Tabs can be static for now if needed
        - You can find types for everything in types.ts, if needed
        - we are using Tailwind CSS

        LATER:
        - Items tab should show active listings
        - Drafts tab should show unpublished listings
        - Sold tab should show sold items
        - Vendor information can be pulled from Firebase Auth / Firestore
      */
      }

      <h1 className="text-2xl font-bold flex justify-center">Vendor Profile!</h1>
    </>
  );
};

export default VendorProfile;
