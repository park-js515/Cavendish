import InputComponent from "./InputComponent";

// 유효성 검증 버튼
// 유효성 테스트 버튼

const SignupList = [
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
    name: "PW1",
    type: "password",
    validator: (value) => {
      return value.length <= 20;
    },
    placeholder: "Password*",
    addBtn: { flag: false },
  },
  {
    name: "PW2",
    type: "password",
    validator: (value) => {
      return value.length <= 20;
    },
    placeholder: "Password Check*",
    addBtn: { flag: false },
  },
  {
    name: "nickname",
    type: "text",
    validator: (value) => {
      return value.length <= 20;
    },
    placeholder: "Nickname*",
    addBtn: { flag: false },
  },
];

const SignupComponent = () => {
  return (
    <>
      {SignupList.map((item) => {
        return <InputComponent key={item.name} {...item} />;
      })}
    </>
  );
};

export default SignupComponent;
