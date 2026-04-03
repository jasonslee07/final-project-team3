const Navbar = () => {
  return (
    <nav className="flex justify-between ">
      <a href="/" className="p-3 hover:bg-neutral-700 hover:text-white">
        Home Page
      </a>
      <div className="flex flex-row ">
        <a href="/login" className="p-3 hover:bg-neutral-700 hover:text-white">
          Login Page
        </a>

        {/* change /error-page to anything and it will still lead to error page */}
        <a href="/error-page" className="p-3 hover:bg-neutral-700 hover:text-white">
          Error Page
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
