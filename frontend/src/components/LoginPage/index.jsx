import { useState, useEffect, useRef } from "react";
import { useInput } from "hooks/LoginPage/useInput";
import ToggleBtn from "./ToggleBtn";
import Layout from "./Layout";
import Footer from "./Footer";
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
    { setCheck: setCheck1 },
    { setCheck: setCheck2 },
    { setCheck: setCheck3 },
    { setCheck: setCheck4 },
    { setCheck: setCheck5 },
  ];

  const checkList2 = [
    { check: check1 },
    { check: check2 },
    { check: check3 },
    { check: check4 },
  ];

  const loginInfo = {
    id: value1,
    password: value2,
  };

  const propsToggleBtn = { isLogin, setIsLogin };

  const check = useRef(false); // 요청을 한 번만 수행하기 위해서 useRef 변수 생성

  useEffect(() => {
    // Login 창으로 이동 시 useEffect를 이용하여 유효성 초기화
    if (!check.current && isLogin) {
      setCheck1(false);
      setCheck2(false);
      setCheck3(false);
      setCheck4(false);
      setCheck5(0);
      check.current = true;
    }

    return () => {
      if (check.current && !isLogin) {
        check.current = false;
      }
    };
  }, [isLogin]);

  return (
    <div className="loginPage-form">
      <ToggleBtn {...propsToggleBtn} />
      <Layout
        isLogin={isLogin}
        list1={list1}
        list2={list2}
        checkList={checkList}
      />
      <Footer isLogin={isLogin} checkList={checkList2} loginInfo={loginInfo} />
    </div>
  );
};

export default LoginPageComponent;
