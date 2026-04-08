import Navbar from "../components/Navbar";

const LoginPage = () => {

  return (
    <>
      <Navbar />

      {
      /*
        PAGE GOAL:
        This page should allow an existing user to log into their account.

        Based on the design, this page should include:
        1. A centered login form
        2. Email input
        3. Password input
        4. Login button

        TODO:
        - Create a centered form section matching the figma
        - Add email input
        - Add password input
        - Add login button

        OPTIONAL (can be done later):
        - Add a link to the signup page
        - Add an error message placeholder
        - Add show/hide password functionality 

        NOTES:
        - Focus on frontend and UI only!
        - Do not connect Firebase Auth yet 
        - we are using Tailwind CSS

        LATER:
        - This page should connect to Firebase Auth sign in
        - Add validation and error handling
      */
      }

      <h1 className="text-2xl font-bold flex justify-center">Login Page!</h1>
    </>
  );
};

export default LoginPage;
