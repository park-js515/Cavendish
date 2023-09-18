import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";

const TIMEOUT = 300;

const Layout = ({ isLogin }) => {
  const nodeRef = useRef(null);
  return (
    <div>
      <CSSTransition
        nodeRef={nodeRef}
        in={isLogin}
        timeout={TIMEOUT}
        classNames="fade"
      >
        <div className="input-group" ref={nodeRef}>
          {isLogin ? <LoginComponent /> : <SignupComponent />}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Layout;
