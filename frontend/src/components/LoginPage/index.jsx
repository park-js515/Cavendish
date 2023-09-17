import { useState } from "react";
import ToggleBtn from "./ToggleBtn";
// import LoginComponent from "./LoginComponent";
// import SignupComponent from "./SignupComponent";

const LoginPageComponent = () => {
  const [isLogin, setIsLogin] = useState(false);
  const propsToggleBtn = { isLogin, setIsLogin };

  return (
    <div className="login-form">
      <ToggleBtn {...propsToggleBtn} />
      {/* jc-center width: 100% 하는 바깥 껍데기 만들기  ? space evenly ? -> 크기 결정해줘야 한다. 이러면 */}
    </div>
  );
};

export default LoginPageComponent;
