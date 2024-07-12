import React, { useContext} from 'react';
import './DisplayImage.css';
import userImages from '../../zustand/userImages';
import shopContext from '../../Context/ShopContext';

export default function DisplayImage() {


    const {images} = userImages()

    const {setShowModal,showModal} = useContext(shopContext)


    const handleCloseClick = ()=>{
        setShowModal(false)
    }

    
    return (<>
       {images && images.map(image=>{
        return <div key={image.id} className={`absolute z-30 ${showModal ? 'display_image showModal':'display_image'}`}>
        <div className='show_image'>
            <button className='close_image' onClick={handleCloseClick}>X</button>
            <img src={image.source} alt="" />
        </div>
    </div>
       }) }
        </>
    );
}
