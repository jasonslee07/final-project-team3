import Navbar from "../components/Navbar";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link } from "react-router";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-col">
          <h1 className="text-3xl text-[#40532D] mt-32 mb-8 flex justify-center">Reset Password</h1>
          {/* {border-t-8 border-[#E2725B]} Not sure if border was necessary */}
          <div className="bg-linear-to-b from-[#EAECDC] to-[#D3D6BA] w-full  flex-1 flex flex-col py-20 items-center">
            {sent ? (
              <>
                <p className="text-green-600">Password reset email sent!</p>
              </>
            ) : (
              <>
                <form action="" className="flex flex-col justify-center items-center w-90 gap-8">
                  <input type="email" placeholder="Email" required className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA]" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <button type="submit" className="py-3 bg-[#E2725C] text-white rounded-md w-full" onSubmit={handleReset}>
                    Send reset email
                  </button>
                </form>
              </>
            )}
            <Link to="/login" className="text-[#40532D] underline mt-6">
              back to login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
