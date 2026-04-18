import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { collection, addDoc} from "firebase/firestore";
import { useState } from "react";
import Navbar from "../components/Navbar";

const ItemEditPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate(); //to redirect user after creating item
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // save item into firestore
  // status will be either "Draft" or "Active"
  const handleSaveItem = async (status: "Draft" | "Active") => {

    // validation so empty fields are not allowed n submitted
    if (!itemName.trim() || !price.trim() || !category.trim() || !description.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      // add a new document to the "items" collection
      // for now img is just previewUrl or test
      // later this can be replaced with a real firebase storage urll
      await addDoc(collection(db, "items"), {
        title: itemName,
        price: Number(price),
        desc: description,
        category,
        img: previewUrl || "test",
        vendorID: currentUser.uid,
        status,
      });

      // different message depending on which button user clicked
      alert(status === "Draft" ? "Draft saved!" : "Item published!");

      // clear form after successful save
      setItemName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setImageFile(null);
      setPreviewUrl("");

      // go back to home/profile page after saving
      navigate("/");
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Something went wrong while saving the item.");
    }
  };

  return (
    <div className="min-h-screen bg-[#dfe3cf]">
      <div className="w-full min-h-screen bg-[#dfe3cf]">

        {/* navbar */}
        <Navbar />

        {/* title section */}
        <div className="bg-[#f7f3eb] py-8 border-b-4 border-[#e6765b]">
          <h1 className="text-4xl text-center text-[#e6765b]">
            Create item
          </h1>
        </div>

        {/* main content stuff */}
        <div className="grid grid-cols-2 gap-10 px-12 py-10">

          {/* image upload on the left, showing a ? for now */}
          <div className="flex flex-col items-center justify-center">
            <label className="w-full h-[320px] border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer bg-white overflow-hidden">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 text-5xl">?</div>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* form inputs on the right */}
          <div className="flex flex-col gap-5">

            {/* item name */}
            <input
              type="text"
              placeholder="Item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="p-3 rounded-md bg-[#ffffff] text-[#6b8f5e] outline-none"
            />

            {/* price and category */}
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="p-3 rounded-md text-[#6b8f5e] bg-[#ffffff] outline-none w-1/2"
              />

              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-3 rounded-md bg-[#ffffff] text-[#6b8f5e] outline-none w-1/2"
              />
            </div>

            {/* description */}
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-3 rounded-md bg-[#ffffff] text-[#6b8f5e] outline-none h-[180px] resize-none"
            />
          </div>
        </div>

        {/* buttons, added functionality */}
        <div className="flex justify-center gap-6 pb-10">
        <button onClick={( ) => handleSaveItem("Draft") } 
        className="px-10 py-3 bg-[#9EAF8C] text-white rounded-md hover:bg-[#8e9f7c] transition">
          Save draft
        </button>

          <button onClick={( ) => handleSaveItem("Active") } 
          className="px-10 py-3 bg-[#E2725B] text-white rounded-md hover:bg-[#d85f47] transition">
            Publish item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemEditPage;