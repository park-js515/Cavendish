import InputComponent from "./InputComponent";

const LoginList = [
  {
    name: "ID",
    type: "text",
    validator: (value) => {
      return value.length <= 20;
    },
    placeholder: "ID(EN)*",
    addBtn: { flag: false, custom_onChange: () => {} },
    addText: { text: "", className: "" },
    autoComplete: "off",
  },
  {
    name: "PW",
    type: "password",
    validator: (value) => {
      return value.length <= 20;
    },
    placeholder: "Password*",
    addBtn: { flag: false, custom_onChange: () => {} },
    addText: { text: "", className: "" },
  },
];

const LoginComponent = ({ list }) => {
  const List = list.map((item, index) => {
    return { ...item, ...LoginList[index] };
  });

  return (
    <>
      {List.map((item) => {
        return <InputComponent key={item.name} {...item} />;
      })}
    </>
  );
};

export default LoginComponent;
