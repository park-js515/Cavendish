const Btn = (addBtn) => {
  return (
    <button className="input-item-btn-before" onClick={addBtn.onClick}>
      {addBtn.content}
    </button>
  );
};

const InputComponent = ({
  value,
  onChange,
  name,
  type,
  placeholder,
  addBtn,
  // text {boolean, text, className}
}) => {
  const props = { value, onChange };

  return (
    <>
      <div className="input-wrapper">
        <input
          name={name}
          type={type}
          {...props}
          placeholder={placeholder}
          className="input-item"
        />
        <div className="input-item-btn-wrapper">
          {addBtn.flag ? <Btn {...addBtn} /> : null}
        </div>
      </div>
      <div className="input-text"></div>
    </>
  );
};

export default InputComponent;
