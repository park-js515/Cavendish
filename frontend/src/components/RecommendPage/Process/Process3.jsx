import { setTab } from "../Tab/TabGroup";

//redux
import { useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

// 3. 용도 선택 자세히
// 입력창?
const Process3 = ({ processHandler }) => {
  const dispatch = useDispatch();

  return (
    <div className="process">
      <p>Process3</p>
      <button
        onClick={() => {
          processHandler(1);
          dispatch(recom.setProcessNo(3));
        }}
      >
        버튼1
      </button>
    </div>
  );
};

export default Process3;
