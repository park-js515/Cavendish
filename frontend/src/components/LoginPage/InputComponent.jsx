import { useInput } from "hooks/default/useInput";

const InputComponent = ({ name, type, validator, placeholder }) => {
  const { value, onChange } = useInput("", validator);
  const props = { value, onChange };

  return (
    <div>
      <input
        name={name}
        type={type}
        {...props}
        placeholder={placeholder}
        className=""
      />
    </div>
  );
};

export default InputComponent;
