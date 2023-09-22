import { setTab } from "../Tab/TabGroup";

//redux
import { useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

// 2. 용도 선택 대분류
// 용도 선택 컴포넌트
const Process2 = ({ processHandler }) => {
  const dispatch = useDispatch();

  return (
    <div className="process">
      <p>Process2</p>
      <button
        onClick={() => {
          processHandler(1);
          dispatch(recom.setProcessNo(2));
        }}
      >
        버튼1
      </button>
    </div>
  );
};

export default Process2;
