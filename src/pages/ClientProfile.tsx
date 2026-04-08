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

      <ProfileHeader // you can delete this, i just put it here so it would stop giving error
        name = {"sponge bob"}
        role = {"Client"}
        desc = {"Member since 2006 | 5 items bought"}
        img = {"../assests/profile-pic.png"}
      />

      <ProfileTab // you can delete this, i just put it here so it would stop giving error
        tab1 = {"Cart"}
        tab2 = {"Ordered"}
        tab3 = {"Past"}
      />

      <ItemCard   // you can delete this, i just put it here so it would stop giving error
        title={"Blanket"}
        price={24.99}
        date={dummyData}
        img={"../assests/throw-blanket.png"}
        vendor={false}
      />

      {
      /*
        PAGE GOAL:
        This page is the client profile page. It should show the client's
        profile information and the products they have interacted with.

        Based on the design, this page should include:
        1. A profile header section
           - profile picture placeholder
           - user's name
           - role label (Client)
           - brief member since text
           - optional: how many items bought

        2. A navigation/tab section
           - Cart
           - Ordered
           - Past

        3. A product display section
           - show products in a row/grid
           - each product should have:
             * image
             * price
             * title
             * when item was added to website

        TODO:
        - Create a profile header layout that matches the figma
        - Add placeholder profile image styling
        - Add the tab labels shown in the design - Cart, Ordered, Past
        - Highlight the active tab (can be static for now)
        - Create a section underneath the tabs for item cards, which would be a component in the future
        - Can use mock data for the product cards for now!
        - Add arrow buttons/carousel-like behavior for the product row

        NOTES:
        - Focus on frontend only for now!
        - Role buttons do not need full logic yet, but should look selectable
        - No need to connect Firebase Auth yet 
        - Styling should follow the figma pretty closely!
        - Do NOT worry about fully functional tabs yet - the tab switching can be static for now
        - Later, connect each section to real user data with backend 
        - You can find types for everything in types.ts, if needed
        - we are using Tailwind CSS
      */
      }

      <h1 className="text-2xl font-bold flex justify-center">Client Profile!</h1>
    </>
  );
};

export default ClientProfile;
