import { useInput } from "hooks/default/useInput";

const InputComponent = ({ name, type, validator, placeholder, addBtn }) => {
  const { value, onChange } = useInput("", validator);
  const props = { value, onChange };

  return (
    <div>
      <input
        name={name}
        type={type}
        {...props}
        placeholder={placeholder}
        className="input-item"
      />
    </div>
  );
};

export default InputComponent;
