import { setTab } from "../Tab/TabGroup";

//redux
import { useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

// 3. 용도 선택 자세히
// 입력창?
const Process3 = () => {
  const dispatch = useDispatch();

  return (
    <div className="process">
      <p>Process3</p>
      <button
        onClick={() => {
          dispatch(recom.setProcessNo(2));
        }}
      >
        버튼1
      </button>
    </div>
  );
};

export default Process3;
