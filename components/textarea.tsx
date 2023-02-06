import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  label?: string;
  name?: string;
  register: UseFormRegisterReturn;
  [key: string]: any;
}

export default function TextArea({
  label,
  name,
  register,
  ...rest
}: TextAreaProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="block my-2 text-lg font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        {...register}
        className="w-full h-56 my-2 border-gray-300 rounded-md shadow-sm resize-none focus:ring-orange-500 focus:border-orange-500"
        rows={4}
        {...rest}
      />
    </div>
  );
}
