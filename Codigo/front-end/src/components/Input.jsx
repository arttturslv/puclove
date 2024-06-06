import { useState } from "react";

export default function Input ({showPass, name, placeholder, value, register, errors, required, type, validationSchema, onClick }) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div onClick={onClick} className="relative  items-center">
            <input
                id={name}
                name={name}
                type={showPassword ? "text" : type }
                value={value}
                {...register(name, validationSchema)}
                placeholder={placeholder}
                className="text-[14px] text-[#fff] w-[100%] h-[45px] py-[7px] px-[15px] rounded-lg bg-[#434343] relative" 
            />
            {showPass==true && showPassword==true ?
                <i onClick={() => setShowPassword(!showPassword)} className="absolute right-3 cursor-pointer  top-2">🙈</i>
                :
                showPass&&
                <i onClick={() => setShowPassword(!showPassword)} className="absolute right-3 cursor-pointer top-2">🐵</i>
            }
            {errors && (
                <p className="text-right text-[12px] text-vermelhoSanguino block">{errors[name]?.message}</p>
            )}
                    
      </div>
    );
}