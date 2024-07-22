import trashIcon from "../assets/Icons/bin.svg";
import { useState } from "react";

const ImageInput = ({ initialImage, onImageChange, index }) => {
    const [image, setImage] = useState(initialImage);

    function handleDelete() {
        setImage(null);
        onImageChange(index, null);
    }

    function handleImageChange(event) {
        if (event.target.files && event.target.files.length > 0) {
            const newImage = URL.createObjectURL(event.target.files[0]);
            setImage(newImage);
            onImageChange(index, newImage);
        }
    }

    return (
        <div style={{backgroundImage: `url(${image})`}} 
             className="h-32 w-32 max-md:w-40 max-md:h-40 max-sm:w-32 max-sm:h-32 bg-cover bg-cinzaWhite rounded-xl relative">
            <form className="w-full h-full flex">
                <label htmlFor={`file-${index}`} className="w-full h-full hover:cursor-pointer"></label>
                <input className="hidden" type="file" multiple="multiple" accept="image/jpg, image/jpeg, image/png*" id={`file-${index}`} name="file"  
                       onChange={handleImageChange}
                />
            </form>
            <a onClick={handleDelete} className="absolute bottom-2 z-50 cursor-pointer right-3">
                <img className="w-6" src={trashIcon} alt="deletar" />
            </a>
        </div>
    );
}

export default ImageInput;
