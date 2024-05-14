import React, { useContext,useState } from 'react';
import './ImageCard.css';
import heart1_icon from "../assets/heart1.png";
import heart2_icon from "../assets/heart2.png";
import delete_icon from "../assets/trash.png";
import shopContext from '../../Context/ShopContext';
import { useLocation,Link} from 'react-router-dom';
import toast from 'react-hot-toast';

const ImageCard = (props) => {

  const location = useLocation()  

  const [imageSrc, setImageSrc] = useState(props.favorite ? heart2_icon : heart1_icon);  // Change image src according to click

  const context = useContext(shopContext)    // getting functions from the shop context
  const {all_images,favorite_images,HOST} = context 
  

  // API to edit the favorite 
  const handleHeartClick = async(id) => {

    try {
      const newImageSrc = imageSrc === heart1_icon ? heart2_icon  : heart1_icon;  // toggle according to click
      setImageSrc(newImageSrc)
  
      let response = await fetch(`${HOST}/api/image/editimage/${id}`,{
        method:"PUT",
        headers:{
          'Content-Type':"application/json",
          'auth-token':localStorage.getItem("auth-token")
        },
        body: JSON.stringify({ favorite: !props.favorite })  // if (favoirte:true) then {false} else {true}
      })
      if(imageSrc===heart1_icon){
        toast.success("Added to favorites")
      }
      else{
        toast.success("Removed from favorites")
      }
      if(location.pathname==="/favorites"){
        favorite_images()
      }
      else{
        all_images()
      }
      
    } catch (error) {
      toast.error("Internal server error")
    }

  };


  // API to delete images
  const handleDeleteClick = async(id)=>{

    try {
      if(window.confirm("Do you want to delete this image ?")){
        const response = await fetch(`${HOST}/api/image/deleteimage/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('auth-token')
          }
        });
  
        const data =await response.json();
        toast.success(data.message)
        all_images()
    
      }
      
    } catch (error) {
      toast.error("Internal server error")
    }
  }




  return (
    <>
    <div className="imageContainer">

      <div className="Images">
        <Link to={`/image/${props.id}`}><img src={props.source} onClick={window.scrollTo(0,0)} className="personal_images" alt="" /></Link>      {/*  When user click on the image it goes to '/image/id' url */}

        <div className="image-icons">
          {location.pathname==="/favorites"?<></>:<img src={delete_icon} onClick={()=>handleDeleteClick(props.id)}  className="delete_icon" alt="Delete" />}
          <img src={imageSrc} style={location.pathname==="/favorites"?{right:"10px"}:{right:"40px"}} onClick={()=>handleHeartClick(props.id)} className="heart_icon" alt="Heart" />
        </div>
      </div>

      {/* show date on the bottom of Image */}
          <p className='image-date'>{props.date}</p>
      </div>
    </>
  );
};

export default ImageCard;
