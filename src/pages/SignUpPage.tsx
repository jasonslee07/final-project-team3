import Navbar from "../components/Navbar";

const SignUpPage = () => {
  return (
    <>
      <Navbar />

      {/*
        PAGE GOAL

        This page should allow a new user to create an account!

        Based on the design, the page should include:
        1. A centered signup form
        2. Name input
        3. Email input
        4. Password input
        5. Role selection
           - Client button
           - Vendor button
        6. Create account button

        TODO:
        - Create a centered form container matching the design!
        - Add inputs for name, email, and password
        - Add two role selection buttons for Client and Vendor
        - Add a submit button labeled "Create account"

        NOTES:
        - Focus on frontend only for now!
        - Role buttons do not need full logic yet, but should look selectable
        - No need to connect Firebase Auth yet 
        - Styling should follow the figma pretty closely!

        LATER:
        - This page should connect to Firebase Auth
        - Backend should create user accounts with the selected role
        - Add validation for empty fields and invalid input
      */}


      <h1 className="text-2xl font-bold flex justify-center">Sign Up Page!</h1>
    </>
  );
};

export default SignUpPage;
