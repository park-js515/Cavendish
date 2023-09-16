import { useState } from "react";
import ToggleBtn from "./ToggleBtn";

const LoginPageComponent = () => {
  const [isLogin, setIsLogin] = useState(false);
  const propsToggleBtn = { isLogin, setIsLogin };

  return (
    <div className="login-form">
      <ToggleBtn {...propsToggleBtn} />
    </div>
  );
};

export default LoginPageComponent;
