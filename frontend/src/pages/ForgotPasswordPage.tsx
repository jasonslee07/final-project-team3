import Navbar from "../components/Navbar";

const ForgotPasswordPage = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-col">
          <h1 className="text-3xl text-[#40532D] mt-32 mb-8 flex justify-center">Reset Password</h1>
          {/* {border-t-8 border-[#E2725B]} Not sure if border was necessary */}
          <div className="bg-linear-to-b from-[#EAECDC] to-[#D3D6BA] w-full  flex-1 flex flex-col py-20 items-center">
            <form action="" className="flex flex-col justify-center items-center w-90 gap-8">
              <input type="email" placeholder="Email" required className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA]" />
              <button type="submit" className="py-3 bg-[#E2725C] text-white rounded-md w-full">
                Send reset email
              </button>
            </form>
            <a href="/login" className="text-[#40532D] underline mt-6">
              back to login
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
