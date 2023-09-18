import { useState } from "react";
import { useInput } from "hooks/LoginPage/useInput";
import ToggleBtn from "./ToggleBtn";
import Layout from "./Layout";
// 유효성 검증에 대한 상태 변수 -> 이걸 다 통과해야 버튼(최종 submit)을 누를 수 있게 만들자

const validator = (value) => {
  return value.length <= 20;
};

const LoginPageComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  // 로그인
  const [value1, onChange1] = useInput("", validator);
  const [value2, onChange2] = useInput("", validator);
  // 회원가입
  const [value3, onChange3] = useInput("", validator);
  const [value4, onChange4] = useInput("", validator);
  const [value5, onChange5] = useInput("", validator);
  const [value6, onChange6] = useInput("", validator);
  
  // 로그인
  const list1 = [
    { value: value1, onChange: onChange1 },
    { value: value2, onChange: onChange2 },
  ];
  // 회원가입
  const list2 = [
    { value: value3, onChange: onChange3 },
    { value: value4, onChange: onChange4 },
    { value: value5, onChange: onChange5 },
    { value: value6, onChange: onChange6 },
  ];

  const propsToggleBtn = { isLogin, setIsLogin };

  return (
    <div className="loginPage-form">
      <ToggleBtn {...propsToggleBtn} />
      <Layout isLogin={isLogin} list1={list1} list2={list2}/>
    </div>
  );
};

export default LoginPageComponent;
