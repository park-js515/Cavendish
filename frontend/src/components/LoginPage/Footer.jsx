import { useNavigate } from "react-router-dom";
import { resetSignupList } from "./SignupComponent";
// redux
import { useSelector, useDispatch } from "react-redux";
import { login as reduxLogin } from "redux/userSlice";

// 후에 로그인, 회원가입 axios를 요청할 페이지
const dummy = [
  // 일단 더미 데이터로 로그인을 처리하겠음.
  { id: "adminNo1", password: "1234" },
  { id: "adminNo2", password: "1234" },
];

const dummyAxios = {
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJhYm8iLCJuaWNrbmFtZSI6ImJhYm8iLCJzcGVpY2FsIjoiZmFsc2UifQ.CyGjjWuP3NdF7eUCV7qG3E8bTWzNT0XryEa7gK0zuxU",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJhYm8iLCJuaWNrbmFtZSI6ImJhYm8iLCJzcGVpY2FsIjoiZmFsc2UifQ.CyGjjWuP3NdF7eUCV7qG3E8bTWzNT0XryEa7gK0zuxU",
  nickname: "adminNo1",
};

const Footer = ({ isLogin, checkList, loginInfo }) => {
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
    // 더미데이터로 로그인
    const res = dummy.some((item) => {
      return item.id === loginInfo.id && item.password === loginInfo.password;
    });

    const setUserInfo = () => {
      localStorage.accessToken = dummyAxios.accessToken;
      localStorage.refreshToken = dummyAxios.refreshToken;
      localStorage.nickname = dummyAxios.nickname;
    }

    if (res) {
      alert("로그인 성공!");
      dispatch(reduxLogin());
      setUserInfo();
      goBackorHome();
    } else {
      alert("로그인 정보가 일치하지 않습니다.");
    }
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

    resetSignupList();
    alert("회원가입 성공!");
    goBackorHome();
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
