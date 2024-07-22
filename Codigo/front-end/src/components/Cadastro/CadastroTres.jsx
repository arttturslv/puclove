import ImageInput from "../ImageInput";
import { useState } from 'react';
export default function CadastroTres({setSignProgress}) {
  const [images, setImages] = useState(Array(6).fill(null));

  const handleImageChange = (index, newImage) => {
      const newImages = [...images];
      newImages[index] = newImage;
      setImages(newImages);
  };

  function imagesLength() {
    let i=0;
    for(const content of images) {
      console.log(content)
      if(content!=null) {
        i++;
      } 
    }
    return i;
  }

  return (
    <>
      <span className="font-semibold text-[#fff] text-[20px] text-center mb-[10px]">Adicione suas fotos para finalizar</span>

      <div className='grid grid-cols-3 gap-4 max-md:grid-cols-2 justify-items-center'>
      {images.map((image, index) => (
                <ImageInput 
                    key={index} 
                    initialImage={image} 
                    onImageChange={handleImageChange} 
                    index={index}
                />
          ))}

      </div>
      {imagesLength()<1 && (<p className="text-right text-[12px] text-vermelhoSanguino">Adicione suas fotos*</p>)}

      <div className="justify-center flex py-4">
        <button onClick={() => setSignProgress("second")} className=" font-extrabold hover:text-[#e2c09b] text-[#fff] hover:bg-[#1c1c1c] uppercase text-[18px] rounded-xl  w-[180px] h-[45px] mt-[10px] text-center">Voltar</button>
        <button disabled={imagesLength()>0?false: true}  onClick={() => console.log("enviando...")} className={[imagesLength()>0?" font-extrabold hover:text-[#e2c09b] text-[#fff] hover:bg-[#1c1c1c] uppercase text-[18px] rounded-xl  w-[180px] h-[45px] mt-[10px] text-center": " font-extrabold text-[#fff]/60 hover:bg-[#1c1c1c] uppercase text-[18px] rounded-xl  w-[180px] h-[45px] mt-[10px] text-center"]} type="submit" >Continuar</button>
      </div>

    </>
  )
};

