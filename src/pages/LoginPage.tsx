import Navbar from "../components/Navbar";

const LoginPage = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-col flex-1">
          <h1 className="text-3xl text-[#E2725B] mt-8 mb-4 flex justify-center">Login Page!</h1>
          <div className="bg-linear-to-b from-[#EAECDC] to-[#D3D6BA] w-full border-t-8 flex-1 border-[#E2725B] flex flex-col pt-10 items-center">
            <form action="" className="flex flex-col justify-center items-center w-90 gap-8">
              <input type="email" placeholder="Email" required className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA]" />
              <input type="password" placeholder="Password" required className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA]" />
              <button type="submit" className="py-3 bg-[#E2725C] text-white rounded-md w-full">
                Log in
              </button>
            </form>
            <a href="/forgot-password" className="text-[#40532D] underline mt-6">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
      {/*
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
      */}
    </>
  );
};

export default LoginPage;
