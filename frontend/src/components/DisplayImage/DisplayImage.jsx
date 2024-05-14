import React, { useContext, useEffect } from 'react';
import shopContext from '../../Context/ShopContext';
import { useParams } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import './DisplayImage.css';

export default function DisplayImage() {

    const navigate = useNavigate();    // used to navigate 

    const { imageData, all_images} = useContext(shopContext);
    const { imageId } = useParams();
    const image = imageData.find((e) => e._id === imageId); // check route parameter id with image id

    // Fetch images when the component mounts
    useEffect(() => {
        // Fetch images only if imageData is empty
        if (imageData.length === 0) {
            all_images();
        }
    }, []);

    // Check if image is not found or imageData is empty
    if (!image || imageData.length === 0) {
    }
    
    const handleCloseClick = () => {   // to handle close button which used to navigate on different component
        if(image.favorite===true){
            navigate("/favorites")
        }
        else{
            navigate("/collections")
        }
    };
    return (
        <div className="display_image">
            <div className='show_image'>
                <button className='close_image' onClick={handleCloseClick}>X</button>
                <img src={image.image} alt="" />
            </div>
        </div>
    );
}
