const Btn = (addBtn) => {
  return (
    <button
      className="input-item-btn-before"
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
}) => {
  const props = addBtn.flag
    ? {
        value,
        onChange: (e) => {
          onChange();
          // addBtn.custom_onChange(e);
        },
      }
    : { value, onChange };

  return (
    <>
      <div className="input-wrapper">
        <input
          name={name}
          type={type}
          value={props.value}
          onChange={props.onChange}
          placeholder={placeholder}
          className="input-item"
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
