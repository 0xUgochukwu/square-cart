/** @format */

const Input = ({
  label,
  value,
  name,
  inputType = "text",
  changeFunction,
  required,
}: {
  label: string;
  value?: string;
  name: string;
  inputType?: string;
  changeFunction: (e: React.FormEvent<HTMLFormElement>) => void;
  required?: boolean;
}) => {
  return (
    <>
      <label className='font-semibold text-sm text-gray-600 pb-1 block'>
        {label}
      </label>
      <input
        type={inputType}
        className='border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full'
        value={value}
        title={label}
        name={name}
        required={required}
        onChange={() => changeFunction}
      />
    </>
  );
};

export default Input;
