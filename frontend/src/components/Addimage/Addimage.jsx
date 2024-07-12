import React, { useContext, useState } from 'react';
import './Addimage.css';
import shopContext from '../../Context/ShopContext';
import toast from 'react-hot-toast';

export default function Addimage() {
  const [images, setImages] = useState([]); // State for multiple images

  const context = useContext(shopContext);
  const { setProgress, HOST } = context;

  // Sets selected images to images state
  const handleImage = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles.length > 4) {
      toast.error("You can upload maximum 4 images");
      e.target.value = null; // Reset file input
      return;
    }
    setImages(Array.from(selectedFiles));
  };

  // API to add images into database
  const add_image = async () => {
    if (!localStorage.getItem("auth-token")) {
      toast.error("Login first");
      return;
    }

    let formData = new FormData();
    images.forEach((image) => {
      formData.append('post', image);
    });

    try {
      setProgress(10);
      const uploadResponse = await fetch(`${HOST}/api/image/upload`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("auth-token")
        },
        body: formData
      });

      setProgress(50);

      const uploadData = await uploadResponse.json();

      if (uploadData.success) {
        const imageDetails = {
          image_urls: uploadData.image_urls,
          favorite: false
        };

        const addResponse = await fetch(`${HOST}/api/image/addimage`, {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
            "auth-token": localStorage.getItem("auth-token")
          },
          body: JSON.stringify(imageDetails)
        });

        setProgress(70);

        const addData = await addResponse.json();
        if (addData.success) {
          toast.success(addData.message);
        } else {
          toast.error(addData.message);
        }

      } else {
        toast.error("Failed to upload images");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while uploading images");
    }

    setProgress(100);
  };

  return (
    <div className="addImageContainer">
      <div className='addimage'>
        <input type="file" accept="image/*" hidden id='image' multiple onChange={handleImage} />
        <label htmlFor="image">+</label>
        <p className='text-[15px] font-semibold my-1'>Click to Add (Max 4 images)</p>
        <div className="imageshow">
          {images.map((image, index) => (
            <img key={index} src={URL.createObjectURL(image)} alt="" />
          ))}
          {/* Placeholder images to ensure 4 images are always shown */}
          {Array.from({ length: Math.max(4 - images.length, 0) }).map((_, index) => (
            <div key={index} className="placeholder-image"></div>
          ))}
        </div>
        {images.length > 0 && <button onClick={add_image} className='submit bg-red-500 my-5 text-white p-2 rounded hover:bg-red-700' type='submit'>Add</button>}
      </div>
    </div>
  );
}
