/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { updatePassword } from "firebase/auth";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const SettingsPage = () => {
  // Variables necessary to make the settings page function
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();

  const hasPickedFile = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // pre load the user's first name and last name so the user knows whats being stored
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userSnap = await getDoc(doc(db, "users", user.uid));
        if (userSnap.exists()) {
          const data = userSnap.data();
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setDescription(data.desc ?? data.description ?? "");
          if (!hasPickedFile.current) {
            setPreviewUrl(data.profileImg);
          }
        }
      }
    };
    fetchUserData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    hasPickedFile.current = true;
    setPreviewUrl(URL.createObjectURL(file));
  };

  const uploadImageAndGetURL = async () => {
    if (!hasPickedFile.current || !inputRef.current?.files?.[0]) return previewUrl;

    const file = inputRef.current.files[0];
    const fname = Date.now() + "-" + file.name;
    const storageRef = ref(storage, "profile-images/" + fname);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  // if the user updates the data, update the firebase to have new data
  const handleUpdate = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("No user logged in");
      return;
    }

    try {
      const imageUrl = await uploadImageAndGetURL();

      // 1. Update Firestore Document (Names)
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        firstName: firstName,
        lastName: lastName,
        desc: description,
        profileImg: imageUrl,
      });
      if (password) await updatePassword(user, password);

      // console.log("User details updated Successfully"); // used for debugging
    } catch (error: any) {
      console.error("Error modifying data: ", error);
    }
    navigate("/");
  };

  console.log("previewUrl:", previewUrl);

  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-col flex-1">
          <h1 className="text-3xl text-[#E2725B] mt-8 mb-4 flex justify-center">Update Details</h1>
          <div className="bg-linear-to-b from-[#EAECDC] to-[#D3D6BA] w-full border-t-8 flex-1 border-[#E2725B] flex flex-col pt-10 items-center">
            <form action="" className="flex flex-col md:flex-row justify-center items-center w-90 md:w-full md:px-10 max-w-5xl gap-12 mb-4">
              <div className="flex flex-col w-full md:w-1/2 gap-4">
                <div className="flex flex-col items-center justify-center">
                  {/* // The label becomes a div, click handler opens the picker */}
                  <div
                    className="w-[300px] h-[300px] border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center cursor-pointer bg-white overflow-hidden"
                    onClick={() => inputRef.current?.click()}
                  >
                    {previewUrl ? <img src={previewUrl} alt="preview" className="w-full h-full object-cover" /> : <div className="text-gray-400 text-5xl">+</div>}
                  </div>
                  <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </div>
              </div>
              <div className="flex flex-col w-full h-90 justify-between">
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-3 rounded-md bg-[#ffffff] text-[#6b8f5e] outline-none h-30 resize-none"
                />
                <input
                  type="text"
                  placeholder="First Name"
                  className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA] focus:text-[#AABA99]"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA] focus:text-[#AABA99]"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input type="password" placeholder="Password" className="py-3 px-4 border w-full bg-white rounded-md text-[#D3D6BA]" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" className="py-3 bg-[#E2725C] text-white rounded-md w-full hover:bg-[#e05135] hover:-translate-y-1 ease-in-out duration-100" onClick={handleUpdate}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
