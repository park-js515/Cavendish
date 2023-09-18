import InputComponent from "./InputComponent";

const LoginList = [
  {
    name: "ID",
    type: "text",
    validator: (value) => {
      return value.length <= 20;
    },
    placeholder: "ID*",
    addBtn: { flag: false },
  },
  {
    name: "PW",
    type: "password",
    validator: (value) => {
      return value.length <= 20;
    },
    placeholder: "Password*",
    addBtn: { flag: false },
  },
];

const LoginComponent = () => {
  return (
    <>
      {LoginList.map((item) => {
        return <InputComponent key={item.name} {...item} />;
      })}
    </>
  );
};

export default LoginComponent;
