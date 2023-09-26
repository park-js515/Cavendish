import Loading from "components/common/Loading";

//redux
import { useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

const ProcessEnd = ({ className }) => {
  const dispatch = useDispatch();

  return (
    <div className={className}>
      <p>ProcesssEnd</p>
    </div>
  );
};

export default ProcessEnd;
