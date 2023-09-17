import { TransitionGroup, CSSTransition } from "react-transition-group";
import LoginComponent from "./LoginComponent";
import SignupComponent from "./SignupComponent";

const TIMEOUT = 1000;

const Layout = ({ isLogin }) => {
  return (
    <>
      {/* <TransitionGroup className="input-group"> */}
      <CSSTransition
        in={isLogin}
        timeout={TIMEOUT}
        className="input-group"
        // unmountOnExit
      >
        <div>{isLogin ? <LoginComponent /> : <SignupComponent />}</div>
      </CSSTransition>
      {/* </TransitionGroup> */}
    </>
  );
};

export default Layout;
