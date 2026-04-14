import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="mt-30 mb-10 flex flex-col gap-4">
        <h1 className="text-5xl flex justify-center text-[#40532D]">Welcome to Sell4Impact!</h1>
        <h2 className="text-2xl flex justify-center text-[#40532D]">Insert brand slogan here</h2>
      </div>
      <div className="py-16 bg-linear-to-b from-[#EAECDC] to-[#D3D6BA] flex justify-center items-center">
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-col gap-6 w-90">
            <a href="/login" className="flex justify-center items-center py-4 bg-[#E2725C] text-white rounded-md">
              Log in
            </a>
            <a href="/sign-up" className="flex justify-center items-center py-3 bg-white border-[#9DAF8B] border-4 rounded-md text-[#9DAF8B]">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
