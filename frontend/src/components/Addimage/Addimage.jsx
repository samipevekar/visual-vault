import React, {  useContext, useState } from 'react'
import './Addimage.css'
import shopContext from '../../Context/ShopContext'
import toast from 'react-hot-toast'

export default function Addimage() {

  const [image,setImage] = useState(false)    // State for image src

  const [imageDetails,setImageDetails] = useState({   // State to handle image details
    image:""
  })

  // Using alert component form shopContext
  const context = useContext(shopContext)
  const {showAlert,setProgress,HOST} = context


  // Sets selected image to image state
  const handleImage = (e)=>{
    setImage(e.target.files[0])
  }

  // Api to add image into database
    const add_image = async () => {
      let post = imageDetails;
      let formData = new FormData();
      formData.append('post', image);                           // Append image to the formData
      
      try {
        setProgress(20)
        const uploadResponse = await fetch(`${HOST}/api/image/upload`, {
          method: "POST",
          headers: {
            Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token")
        },
        body: formData
      });

      setProgress(50)

      const uploadData = await uploadResponse.json();
      
      if (uploadData.success) {                           // If upload successful then add image url
        post.image = uploadData.image_url;
        const addResponse = await fetch(`${HOST}/api/image/addimage`, {
          method: "POST",
          headers: {
            'Content-Type': "application/json",
            "auth-token": localStorage.getItem("auth-token")
          },
          body: JSON.stringify(post)
        });

        setProgress(70)

        const addData = await addResponse.json();
        if (addData.success) {
          toast.success(addData.message);
        } else {
          toast.error(addData.message);
        }

      } 
      else {
        alert(addData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while uploading image","danger");
      
    }       
    setProgress(100)
  
  }
  return (
    <>
    <div className="addImageContainer">
    <div className='addimage'>
      <input type="file" accept="image/*" hidden id='image' onChange={handleImage} />
        <label htmlFor="image">+</label>
        <p>Click here to add</p>
      <div className="imageshow">
        <img src={image?URL.createObjectURL(image):null}  alt="" />  {/* if there is image assign uploaded image to src */}
      </div>
      {!image?<></>:<button onClick={add_image} className='btn btn-primary my-4'  type='submit'>Add</button>}
    </div>
    </div>
    </>
  )
}
