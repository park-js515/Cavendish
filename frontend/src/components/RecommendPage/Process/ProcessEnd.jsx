import { setTab } from "../Tab/TabGroup";
import Loading from "components/common/Loading";

//redux
import { useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

const ProcessEnd = ({ className }) => {
  const dispatch = useDispatch();
  
  return (
    <div className={className}>
      <p>ProcesssEnd</p>
      <button
        onClick={() => {
          dispatch(recom.setProcessNo(3));
        }}
      >
        back
      </button>
    </div>
  );
};

export default ProcessEnd;
