import { useState } from "react";
import Navbar from "../components/Navbar";

const SignUpPage = () => {
  const [isClient, setIsClient] = useState<boolean>(true);
  const [isVendor, setIsVendor] = useState<boolean>(false);

  function handleClick() {
    setIsClient(!isClient);
    setIsVendor(!isVendor);
  }
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-col flex-1">
          <h1 className="text-3xl text-[#E2725B] mt-8 mb-4 flex justify-center">Sign up</h1>
          <div className="bg-linear-to-b from-[#EAECDC] to-[#D3D6BA] w-full border-t-8 flex-1 border-[#E2725B] flex flex-col pt-10 items-center">
            <form action="" className="flex flex-col justify-center items-center w-90 gap-8">
              <div className="flex gap-10">
                <button type="button" className={`text-2xl px-8 py-2 rounded-2xl ${isClient ? "bg-[#A8B897]" : "bg-white"}`} onClick={handleClick}>
                  Client
                </button>
                <button type="button" className={`text-2xl px-8 py-2 rounded-2xl ${isVendor ? "bg-[#A8B897]" : "bg-white"}`} onClick={handleClick}>
                  Vendor
                </button>
              </div>
              <p className="text-xl text-[#40532D]">I want to join as a...</p>
              <input type="text" placeholder="First Name" required className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA] focus:text-[#AABA99]" />
              <input type="text" placeholder="Last Name" required className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA] focus:text-[#AABA99]" />
              <input type="email" placeholder="Email" required className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA]" />
              <input type="password" placeholder="Password" required className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA]" />
              <button type="submit" className="py-3 bg-[#E2725C] text-white rounded-md w-full">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>

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
        - we are using Tailwind CSS

        LATER:
        - This page should connect to Firebase Auth
        - Backend should create user accounts with the selected role
        - Add validation for empty fields and invalid input
      */}
    </>
  );
};

export default SignUpPage;
