import InputComponent from "./InputComponent";

const SignupList = [
  {
    name: "ID",
    type: "text",
    placeholder: "ID*",
    addBtn: { flag: true, content: "중복검사", onClick: () => {} },
  },
  {
    name: "PW1",
    type: "password",
    placeholder: "Password*",
    addBtn: { flag: false },
  },
  {
    name: "PW2",
    type: "password",
    placeholder: "Password Check*",
    addBtn: { flag: false },
  },
  {
    name: "nickname",
    type: "text",
    placeholder: "Nickname*",
    addBtn: { flag: true, content: "중복검사", onClick: () => {} },
  },
];

const SignupComponent = ({ list }) => {
  const List = list.map((item, index) => {
    return { ...item, ...SignupList[index] };
  });

  return (
    <>
      {List.map((item) => {
        return <InputComponent key={item.name} {...item} />;
      })}
    </>
  );
};

export default SignupComponent;
