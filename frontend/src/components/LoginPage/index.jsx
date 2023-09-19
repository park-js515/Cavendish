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
  const [value1, onChange1] = useInput("", validator, true);
  const [value2, onChange2] = useInput("", validator, false);
  // 회원가입
  const [value3, onChange3] = useInput("", validator, true);
  const [value4, onChange4] = useInput("", validator, false);
  const [value5, onChange5] = useInput("", validator, false);
  const [value6, onChange6] = useInput("", validator, false);
  // 유효성 검증
  const [check1, setCheck1] = useState(false); // ID 유효성 체크
  const [check2, setCheck2] = useState(false); // PW1 유효성 체크
  const [check3, setCheck3] = useState(false); // PW2 유효성 체크
  const [check4, setCheck4] = useState(false); // nickname 유효성 체크
  const [check5, setCheck5] = useState(0); // 재렌더링을 위해 생성한 더미 변수

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
  // 유효성 검증
  const checkList = [
    { check: check1, setCheck: setCheck1 },
    { check: check2, setCheck: setCheck2 },
    { check: check3, setCheck: setCheck3 },
    { check: check4, setCheck: setCheck4 },
    { check: check5, setCheck: setCheck5 },
  ];

  const propsToggleBtn = { isLogin, setIsLogin };
  const dummy = [
    { id: "adminNo1", password: "1234" },
    { id: "adminNo2", password: "1234" },
  ];

  return (
    <div className="loginPage-form">
      <ToggleBtn {...propsToggleBtn} />
      <Layout
        isLogin={isLogin}
        list1={list1}
        list2={list2}
        checkList={checkList}
      />
    </div>
  );
};

export default LoginPageComponent;
