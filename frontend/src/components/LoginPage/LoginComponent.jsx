import InputComponent from "./InputComponent";

const LoginList = [
  {
    name: "ID",
    type: "text",
    validator: (value) => {
      return value.length <= 20;
    },
    placeholder: "ID*",
  },
  {
    name: "PW",
    type: "password",
    validator: (value) => {
      return value.length <= 20;
    },
    placeholder: "Password*",
  },
];

const LoginComponent = () => {
  return (
    <>
      {LoginList.map((item) => {
        return <InputComponent key={item.name} {...item}/>;
      })}
    </>
  );
};

export default LoginComponent;
