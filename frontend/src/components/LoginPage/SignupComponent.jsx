import InputComponent from "./InputComponent";

const SignupList = [
  {
    name: "ID",
    type: "text",
    validator: (value) => {
      return value.length <= 20;
    },
    placeholder: "ID*",
  },
  {
    name: "PW1",
    type: "password",
    validator: (value) => {
      return value.length <= 20;
    },
    placeholder: "Password*",
  },
  {
    name: "PW2",
    type: "password",
    validator: (value) => {
      return value.length <= 20;
    },
    placeholder: "Password Check*",
  },
  {
    name: "nickname",
    type: "text",
    validator: (value) => {
      return value.length <= 20;
    },
    placeholder: "Nickname*",
  },
];

const SignupComponent = () => {
  return (
    <>
      {SignupList.map((item) => {
        return <InputComponent {...item} />;
      })}
    </>
  );
};

export default SignupComponent;
