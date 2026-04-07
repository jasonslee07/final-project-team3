import Navbar from "../components/Navbar";

const VendorProfile = () => {
  return (
    <>
      <Navbar />

      {/*
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

        LATER:
        - Items tab should show active listings
        - Drafts tab should show unpublished listings
        - Sold tab should show sold items
        - Vendor information can be pulled from Firebase Auth / Firestore
      */}

      <h1 className="text-2xl font-bold flex justify-center">Vendor Profile!</h1>
    </>
  );
};

export default VendorProfile;
