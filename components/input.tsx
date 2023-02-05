import { type } from "os";
import type { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  placeholder?: string;
  label: string;
  name: string;
  kind?: "text" | "phone" | "price";
  register?: UseFormRegisterReturn;
  type: string;
  required: boolean;
}

export default function Input({
  label,
  name,
  kind = "text",
  register,
  type,
  required,
}: InputProps) {
  return (
    <div>
      <label
        className="block mb-1 text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>
      {kind === "text" ? (
        <div className="relative flex items-center rounded-md shadow-sm">
          <input
            id={name}
            type={type}
            {...register}
            required={required}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      ) : null}
      {kind === "price" ? (
        <div className="relative flex items-center rounded-md shadow-sm">
          <div className="absolute left-0 flex items-center justify-center pl-3 pointer-events-none">
            <span className="text-sm text-gray-500">$</span>
          </div>
          <input
            id={name}
            type={type}
            {...register}
            required={required}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none pl-7 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
          <div className="absolute right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500">KRW</span>
          </div>
        </div>
      ) : null}
      {kind === "phone" ? (
        <div className="flex rounded-md shadow-sm">
          <span className="flex items-center justify-center px-3 text-sm text-gray-500 border border-r-0 border-gray-300 select-none rounded-l-md bg-gray-50">
            +82
          </span>
          <input
            id={name}
            type={type}
            {...register}
            required={required}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md rounded-l-none shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      ) : null}
    </div>
  );
}
