import { useNavigate } from "react-router-dom";
import { resetSignupList } from "./SignupComponent";
// redux
import { useSelector, useDispatch } from "react-redux";
import { login as reduxLogin } from "redux/userSlice";
// axios
import { memberLogin, memberSignUp, memberRemove } from "api/member";
import axios from "axios";

const Footer = ({ isLogin, checkList, loginInfo, signupInfo }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBackorHome = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const login = () => {
    memberLogin(
      { loginId: loginInfo.id, password: loginInfo.password },
      (response) => {
        localStorage.setItem("accessToken", response.data.response.accessToken);
        localStorage.setItem(
          "refreshToken",
          response.data.response.refreshToken,
        );
        dispatch(reduxLogin());
        goBackorHome();
      },
      (error) => {
        alert("로그인 정보가 일치하지 않습니다.");
        console.error(error);
      },
    );
  };

  const signup = () => {
    if (!checkList[0].check) {
      alert("아이디 유효성이 체크되지 않았습니다.");
      return;
    } else if (!checkList[1].check || !checkList[2].check) {
      alert("비밀번호 유효성이 체크되지 않았습니다.");
      return;
    } else if (!checkList[3].check) {
      alert("닉네임 유효성이 체크되지 않았습니다.");
      return;
    }

    memberSignUp(
      {
        loginId: signupInfo.id,
        password: signupInfo.password,
        nickname: signupInfo.nickname,
      },
      (response) => {
        memberLogin(
          { loginId: signupInfo.id, password: signupInfo.password },
          (response) => {
            localStorage.setItem(
              "accessToken",
              response.data.response.accessToken,
            );
            localStorage.setItem(
              "refreshToken",
              response.data.response.refreshToken,
            );
            dispatch(reduxLogin());
            goBackorHome();
          },
          (error) => {
            console.error(error);
          },
        );
        resetSignupList();
      },
      (error) => {
        console.error(error);
      },
    );
  };

  const submitFn = isLogin ? login : signup;

  return (
    <div className="footer">
      <div className="left" onClick={goBackorHome}>{`< Back`}</div>
      <div className="right" onClick={submitFn}>
        Submit
      </div>
    </div>
  );
};

export default Footer;
