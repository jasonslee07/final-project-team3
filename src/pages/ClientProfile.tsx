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
        img = {"../assets/profile-pic.png"}
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
        This page is the client profile page. It should show the client's profile information, 
        navigation tabs, and item cards based on the design.

        Based on the design, this page should include:
        1. Navbar component
          - appears at the top of the page
          - should include:
            - Sell4Impact logo/title on the left
            - home icon on the right
            - profile icon on the right

        2. ProfileHeader component
          - should display:
            - profile picture/initials placeholder
            - user's name
            - role label ("Client")
            - short description/summary text
              example: "5 items bought"

        3. ProfileTab component
          - should display three tabs:
            - Cart
            - Ordered
            - Past
          - Cart should appear as the active tab for now
          - active tab styling can be static for now

        4. ItemCard component(s)
          - this section should display the client's items in the selected tab
          - based on the design, each card should include:
            - item image on the left
            - delete/trash icon in the top-left area of the item image
            - item title
            - item price
            - category/tag labels
              example: "Desk"
            - date text
              example: "Added 7 April 2026"
            - button for viewing product details
          - for the client page, vendor should be false!
          - multiple item cards can be rendered using mock data

        TODO:
        - Arrange the page vertically in this order:
          Navbar -> ProfileHeader -> ProfileTab -> ItemCard section
        - Match spacing, colors, and proportions as much as possible from the Figma design!
        - Use mock data for now
        - Render multiple ItemCard components if needed to better reflect the design
        - Keep Cart as the default highlighted tab

        NOTES:
        - Focus on frontend and UI only
        - No backend or Firebase logic is needed yet
        - Do not implement functional tab switching yet
        - Do not implement delete/product button functionality yet
        - You can assume props are passed in correctly
        - Types for everything can be found in types.ts
        - We are using Tailwind CSS!

        LATER:
        - Tab switching should update which item list is shown
        - Data should come from Firebase
        - Delete icon should remove items from cart or the relevant section
        - "View Product Details" should route to the item page
      */
      }

      <h1 className="text-2xl font-bold flex justify-center">Client Profile!</h1>
    </>
  );
};

export default ClientProfile;
