const Navbar = () => {
  return (
    <>
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

    {
    /*
        COMPONENT GOAL:
        This component represents the navigation bar shown across all pages.
        It allows users to navigate between key parts of the application.

        Based on the design, this component should include:
        1. Logo/Title
          - Clicking the logo should navigate to the Home page

        2. Navigation links
          - Home
          - Login
          - Cart icon 
          - Profile icon (to dashboard)
          - These can be placeholders for now!

        TYPE NOTES:
        - This component currently does not take in props
        - In the future, it may use:
          - role of type UserRole ("Client" | "Vendor")
          - to determine which navigation links to display
        - You can find UserRole defined in types.ts          

        TODO:
        - implement all the parts of this component, following the Figma design and color style

        NOTES:
        - Focus on frontend and UI only!
        - Navigation is implemented using React Router <Link>
        - No authentication logic needed yet
        - we are using Tailwind CSS

        LATER:
        - Conditionally render links based on the login state
        
      */
      }
      </>

  );
};

export default Navbar;
