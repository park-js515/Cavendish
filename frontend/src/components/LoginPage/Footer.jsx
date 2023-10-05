import { useNavigate } from "react-router-dom";
import { resetSignupList } from "./SignupComponent";

// redux
import { useSelector, useDispatch } from "react-redux";
import { login as reduxLogin } from "redux/userSlice";

// axios
import { memberLogin, memberSignUp, memberRemove } from "api/member";
import Swal from "sweetalert2";

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
        Swal.fire({
          icon: "error",
          title: "로그인 에러",
          text: "로그인 정보가 일치하지 않습니다.",
        });
      },
    );
  };

  const signup = () => {
    if (!checkList[0].check) {
      Swal.fire({
        icon: "error",
        title: "회원가입 에러",
        text: "아이디 유효성이 체크되지 않았습니다.",
      });
      return;
    } else if (!checkList[1].check || !checkList[2].check) {
      Swal.fire({
        icon: "error",
        title: "회원가입 에러",
        text: "비밀번호 유효성이 체크되지 않았습니다.",
      });
      return;
    } else if (!checkList[3].check) {
      Swal.fire({
        icon: "error",
        title: "회원가입 에러",
        text: "닉네임 유효성이 체크되지 않았습니다.",
      });
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
