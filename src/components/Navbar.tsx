const Navbar = () => {
  return (
    <nav className="flex justify-between bg-linear-to-b from-[#AABA99] to-[#9EAF8C]">
      <a href="/" className="text-xl text-[#E2725B] bg-white m-2 px-8 py-2 rounded-lg">
        Sell4Impact
      </a>
      {/*
      For Future Reference: 

      if user is logged in, add a few extra pieces to the login page on the other side
      One button for home page
      One button for User Profile
      */}
      {/* <div className="flex flex-row ">
        <a href="/login" className="p- hover:text-white">
          Login Page
        </a>
        <a href="/error-page" className="p-3 hover:text-white">
          Error Page
        </a>
      </div> */}
    </nav>


  );
};

export default Navbar;
