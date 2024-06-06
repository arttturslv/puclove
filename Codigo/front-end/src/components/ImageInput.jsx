import trashIcon from "../assets/Icons/bin.svg";
import { useState, useEffect } from "react";
import axios from "axios";

const ImageInput = ({token}) => {
    const[preview, setPreview] = useState();
    const[images, setImages] = useState();
    const[progress, setProgress] = useState({started:false, pc:0});

    function handleUpload(images) {
        if(!images) return;
        const reader = new FileReader();
        reader.onload = function (e) {
            let tmp;
            tmp = e.target.result;
            setPreview(tmp);
        }
        reader.readAsDataURL(images);

        uploadImage(images);

    }

    const uploadImage = async (file) => {
        const fd = new FormData();
        fd.append('file', images);

        setProgress(prevState => {
            return {...prevState, started: true}
        });
        
        try {
          const res = await axios.post(
            "http://localhost:8080/api/v1/image",
            fd,
            {
            onUploadProgress: (progressEvent) => {setProgress(prevState => {
                return {...prevState, pc: progressEvent.progress*100}
            })},
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
            }
          );
          console.log(res.data);
          console.log("Sucesso no upload");
        } catch (error) {
          console.error("Erro de upload: ", error);
        }
      };


    function handleDelete() {
        console.log("Deletando foto - Falta requisicao de delete");
        setPreview(null);
    }

    useEffect(() => {
        if (images) {
            handleUpload(images);
        }
    }, [images]);

    return (
        <div style={{backgroundImage: `url(${preview})`}} className="w-[130px]  max-sm:w-[100px] max-sm:h-[100px] bg-cover h-[130px] bg-cinzaWhite rounded-xl relative">
        <form className="w-full h-full flex">
            <label htmlFor="file" className="w-full h-full hover:cursor-pointer">
            {
                progress.started && <progress className="absolute z-10 h-1 w-[100%] bg-black" max="100" value={progress.pc}></progress>
            }
            </label>
            
            <input className="hidden" type="file" multiple="multiple" accept="image/jpg, image/jpeg, image/png*" id="file" name="file"  
            onChange={e => {
               if(e.target.files && e.target.files.length > 0) {
                    setImages(e.target.files[0]);
                }
            }}
            />
          
        </form>
        <a onClick={() => handleDelete()} className="absolute bottom-2 z-50 cursor-pointer right-3">
            <img className="w-6" src={trashIcon} alt="deletar" />
        </a>
      
    </div>

    );
}

export default ImageInput;