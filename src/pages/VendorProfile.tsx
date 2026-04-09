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
        img = {"../assets/profile-pic.png"}
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
        This page represents the vendor profile page. It should display the
        vendor's profile information, navigation tabs, and item cards based on
        the updated design.

        Based on the updated design, this page should include:

        1. Navbar component
          - appears at the top of the page
          - should include:
            - Sell4Impact logo/title on the left
            - home icon on the right
            - profile icon on the right

        2. ProfileHeader component
          - should display:
            - profile picture/initials placeholder
            - vendor name
            - role label ("Vendor")
            - short seller summary text
              example: "4.6 avg rating | 5 items sold"
          - the profile image can be a real image or initials placeholder for now

        3. ProfileTab component
          - should display three tabs:
            - Items
            - Drafts
            - Sold
          - Items should appear as the active tab for now
          - active tab styling can be static for now

        4. ItemCard component(s)
          - this section should display the vendor's items in the selected tab
          - based on the updated design, each card should include:
            - item image on the left
            - delete/trash icon in the top-left area of the item image
            - item title
            - item price
            - category/tag labels
              example: "Desk"
            - date text
              example: "Added 7 April 2026"
            - button for editing item details
          - for the vendor page, vendor should be true
          - multiple item cards can be rendered using mock data

        TODO:
        - Arrange the page vertically in this order:
          Navbar -> ProfileHeader -> ProfileTab -> ItemCard section
        - Match spacing, colors, and proportions from the updated figma design
        - Use mock data for now
        - Render multiple ItemCard components if needed to better reflect the design
        - Keep Items as the default highlighted tab

        NOTES:
        - Focus on frontend and UI only
        - No backend or Firebase logic is needed yet
        - Do not implement functional tab switching yet
        - Do not implement delete/edit button functionality yet
        - You can assume props are passed in correctly
        - Types for everything can be found in types.ts
        - We are using Tailwind CSS!

        LATER:
        - Tab switching should update which item list is shown
        - Data should come from Firebase
        - Delete icon should remove items from the relevant section
        - "Edit Item Details" should allow vendors to update their listings
        - Drafts tab should show unpublished items
        - Sold tab should show sold items  
      */
      }

      <h1 className="text-2xl font-bold flex justify-center">Vendor Profile!</h1>
    </>
  );
};

export default VendorProfile;
