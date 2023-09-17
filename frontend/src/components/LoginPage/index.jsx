import { useState } from "react";
import ToggleBtn from "./ToggleBtn";
// import LoginComponent from "./LoginComponent";
// import SignupComponent from "./SignupComponent";
import Layout from "./Layout";
// 유효성 검증에 대한 상태 변수 -> 이걸 다 통과해야 버튼(최종 submit)을 누를 수 있게 만들자

const LoginPageComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const propsToggleBtn = { isLogin, setIsLogin };

  return (
    <div className="loginPage-form">
      <ToggleBtn {...propsToggleBtn} />

      <Layout isLogin={isLogin} />
      {/* <div className="input-group">
        {isLogin ? <LoginComponent /> : <SignupComponent />}
      </div> */}
    </div>
  );
};

export default LoginPageComponent;
