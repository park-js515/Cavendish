const Btn = (addBtn) => {
  return (
    <button
      className={addBtn.className}
      onClick={addBtn.onClick}
      disabled={addBtn.disabled}
    >
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
  addText,
  ...props
}) => {
  const custom_onChange = (event) => {
    onChange(event);
    addBtn.custom_onChange(event);
  };

  return (
    <>
      <div className="input-wrapper">
        <input
          name={name}
          type={type}
          value={value}
          onChange={custom_onChange}
          placeholder={placeholder}
          className="input-item"
          {...props}
        />
        <div className="input-item-btn-wrapper">
          {addBtn.flag ? <Btn {...addBtn} /> : null}
        </div>
      </div>
      <div className={`input-text ${addText.className}`}>{addText.text}</div>
    </>
  );
};

export default InputComponent;
