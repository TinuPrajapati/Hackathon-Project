import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Input = ({ text, type, id, placeholder, icon }) => {
    const [showPassword, setShowPassword] = useState(true);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className='flex flex-col gap-1 w-full mb-2'>
            <div className='flex items-center gap-1 pl-2'>
                {icon}
                <label htmlFor={id} className='text-lg'>{text}</label>
            </div>
            <div className='relative'>
                <input 
                    type={type === 'password' && !showPassword ? 'text' : type} 
                    id={id} 
                    placeholder={placeholder} 
                    className='bg-gray-200 h-10 rounded-md px-2 outline-none focus:ring-2 focus:ring-purple-400 w-full pr-10' 
                />
                {type === 'password' && (
                    <button 
                        type='button' 
                        className='absolute inset-y-0 right-2 flex items-center text-gray-500' 
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;
