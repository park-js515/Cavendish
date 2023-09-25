import { memberUpdate } from "api/member";
import { useState } from "react";

export default function MyPageUpdateComponent({ data, setIsUpdate }) {
  const [newNick, setNewNick] = useState(data.nickname);
  const [password, setPassword] = useState("");
  const handleNickChange = (e) => {
    setNewNick((current) => e.target.value);
  };
  const handlePassword = (e) => {
    setPassword((current) => e.target.value);
  };
  const updateCompleteHandler = () => {
    memberUpdate(
      { password: password, nick: newNick },
      () => {},
      () => {},
    );
    setIsUpdate(false);
  };

  return (
    <div className="mypage_info">
      <image className="user_img" src="#" alt="user_img" />
      <div className="user_info">
        <div className="user_id">{data.memberId}</div>
        <div className="user_nickname">
          <input value={newNick} type="text" onChange={handleNickChange} />
        </div>
      </div>
      <input
        value={password}
        type="text"
        onChange={handlePassword}
        placeholder="password를 입력해 주세요"
      />
      <button onClick={updateCompleteHandler}>완료</button>
    </div>
  );
}
