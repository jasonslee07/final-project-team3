import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import type { ItemStatus } from "../../types/types";

const ItemEditPage = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const fetchItem = async () => {
      const ref = doc(db, "items", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setItemName(data.title);
        setPrice(String(data.price));
        setCategory(data.category);
        setDescription(data.desc);
        setPreviewUrl(data.img);
      }
    };
    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      const reference = doc(db, "items", id);
      await deleteDoc(reference);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
    navigate("/");
  };


  const uploadImageAndGetURL = async () => {
  
    if (!imageFile) return previewUrl; 
    
    const fname = Date.now() + "-" + imageFile.name;
    const storageRef = ref(storage, "item-images/" + fname);
    await uploadBytes(storageRef, imageFile);
    return await getDownloadURL(storageRef);
  };

  const handleUpdateItem= async (status : ItemStatus) => {

    if (!id) return;

    try {
      const reference = doc(db, "items", id);
      const imageUrl = await uploadImageAndGetURL();
      await updateDoc(reference, {
        title: itemName,
        price: parseInt(price),
        category: category,
        desc: description,
<<<<<<< HEAD
        img: previewUrl,
        status: status,
=======
        img: imageUrl,
        status: status
>>>>>>> 87f6cf76f95a70f6ab6c25c0b30b53dc6f763d10
      });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const onPublish = () => {
    handleUpdateItem("Active");
    navigate("/");
  };

  const onSave = () => {
    handleUpdateItem("Draft");
    navigate("/");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <div className="min-h-screen bg-[#dfe3cf]">
      <div className="w-full min-h-screen bg-[#dfe3cf]">
        {/* navbar */}
        <Navbar />
        {/* title section */}
        <div className="bg-[#f7f3eb] py-8 border-b-4 border-[#e6765b]">
          <h1 className="text-4xl text-center text-[#e6765b]">Edit item</h1>
        </div>
        main content stuff
        <div className="grid grid-cols-2 gap-10 px-12 py-10">
          {/* image upload on the left, showing a ? for now */}
          <div className="flex flex-col items-center justify-center">
            <label className="w-full h-[320px] border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center cursor-pointer bg-white overflow-hidden">
              {previewUrl ? <img src={previewUrl} alt="preview" className="w-full h-full object-cover" /> : <div className="text-gray-400 text-5xl">?</div>}

              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>

          {/* form inputs on the right */}
          <div className="flex flex-col gap-5">
            {/* item name */}
            <input type="text" placeholder="Item name" value={itemName} onChange={(e) => setItemName(e.target.value)} className="p-3 rounded-md bg-[#ffffff] text-[#6b8f5e] outline-none" />

            {/* price and category */}
            <div className="flex gap-4">
              <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="p-3 rounded-md text-[#6b8f5e] bg-[#ffffff] outline-none w-1/2" />

              <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="p-3 rounded-md bg-[#ffffff] text-[#6b8f5e] outline-none w-1/2" />
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
        {/* buttons, no functionality for now */}
        <div className="flex justify-center gap-6 pb-10">
          <button className="px-10 py-3 bg-[#9EAF8C] text-white rounded-md hover:bg-[#8e9f7c] transition " onClick={onSave}>
            Save draft
          </button>
          <button className="px-10 py-3 bg-[#E2725B] text-white rounded-md hover:bg-[#d85f47] transition" onClick={onPublish}>
            Publish item
          </button>
          <button className="px-10 py-3 bg-white text-zinc-500 rounded-md hover:bg-gray-200 transition" onClick={handleDelete}>
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemEditPage;
