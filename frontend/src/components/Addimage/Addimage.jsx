import React, { useContext, useState } from 'react';
import './Addimage.css';
import shopContext from '../../Context/ShopContext';
import toast from 'react-hot-toast';

export default function Addimage() {
  const [image, setImage] = useState(null); // State for image file

  const context = useContext(shopContext);
  const { setProgress, HOST } = context;

  // Sets selected image to image state
  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // API to add image into database
  const add_image = async () => {
    if(!localStorage.getItem("auth-token")){
      toast.error("login first")
    }
    let formData = new FormData();
    formData.append('post', image);

    try {
      setProgress(20);
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
          image: uploadData.image_url,
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
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while uploading image");
    }
    
    setProgress(100);
  };

  return (
    <div className="addImageContainer">
      <div className='addimage'>
        <input type="file" accept="image/*" hidden id='image' onChange={handleImage} />
        <label htmlFor="image">+</label>
        <p>Click here to add</p>
        <div className="imageshow">
          <img src={image ? URL.createObjectURL(image) : null} alt="" />
        </div>
        {image && <button onClick={add_image} className='btn btn-primary my-4' type='submit'>Add</button>}
      </div>
    </div>
  );
}
