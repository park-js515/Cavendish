import { useEffect } from "react";
import InputComponent from "./InputComponent";

const SignupList = [
  {
    name: "ID",
    type: "text",
    placeholder: "ID*",
    addBtn: {
      flag: true,
      content: "중복검사",
      onClick: () => {},
      disabled: false,
      custom_onChange: () => {},
    },
    addText: { text: "", className: "" },
  },
  {
    name: "PW1",
    type: "password",
    placeholder: "Password*",
    addBtn: { flag: false },
    addText: { text: "", className: "" },
  },
  {
    name: "PW2",
    type: "password",
    placeholder: "Password Check*",
    addBtn: { flag: false },
    addText: { text: "", className: "" },
  },
  {
    name: "nickname",
    type: "text",
    placeholder: "Nickname*",
    addBtn: {
      flag: true,
      content: "중복검사",
      onClick: () => {},
      disabled: false,
      custom_onChange: () => {},
    },
    addText: { text: "", className: "" },
  },
];

const dummy1 = ["user1", "user2"];
const dummy2 = ["user1", "user2"];
const idLowerBound = 6;
const pwLowerBound = 4;
const nickLowerBound = 2;

const SignupComponent = ({ list, checkList }) => {
  // 1
  const onChange0 = (e) => {
    if (!e.target.value) return;
    const val = e.target.value;

    if (val.length < idLowerBound) {
      SignupList[0].addBtn.disabled = true;
      SignupList[0].addText.text = "❗ 입력이 너무 짧습니다.";
      SignupList[0].addText.className = "input-text-red";
    }
    else {
      SignupList[0].addText.text = "";
      SignupList[0].addText.className = "";
    }
    SignupList[0].addBtn.content = "중복검사";
  }
  SignupList[0].addBtn.custom_onChange = onChange0;

  // 2
  // useEffect(() => {}, [])
  // 3
  // useEffect(() => {}, [])
  // 4
  // useEffect(() => {}, [])

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
