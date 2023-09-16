import { useInput } from "hooks/default/useInput";

const InputComponent = ({ name, type, validator, placeholder }) => {
  const { value, onChange } = useInput("", validator);
  const props = { value, onChange };

  return (
    <>
      <label htmlFor={name} className="">
        {name}
        <input
          id={name}
          type={type}
          {...props}
          placeholder={placeholder}
          className=""
        />
      </label>
    </>
  );
};

export default InputComponent;
