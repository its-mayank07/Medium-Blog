import type { ChangeEvent } from "react";

interface labelledInputType{
    label : string;
    placeholder : string;
    onChange : (e:ChangeEvent<HTMLInputElement>)=> void;
    type? : string;
}

const LabelledInput = ({label,placeholder,onChange,type}:labelledInputType) => {
  return (
 
        <div className="mt-4">
            <label  className="block mb-1 text-sm font-semibold text-gray-900">{label}</label>
            <input onChange={onChange} type={type || "text"} id={label} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>

  )
}

export default LabelledInput;