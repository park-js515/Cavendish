import { useDispatch, useSelector } from "react-redux";
import * as recom from "redux/recommendSlice";

const CancelBtn = ({ resetTab, processNo }) => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        resetTab();
        dispatch(recom.setProcessNo(processNo - 1));
      }}
    >
      X
    </div>
  );
};

// pos < 0: 이미 선택된 것
// pos === -1: 취소 가능하게 할 것
// pos === 0: 현재 선택 중
// pos > 0: 미선택
const TabItem = ({ className, title, content, resetTab, index }) => {
  const processNo = useSelector((state) => state.recommend.processNo);
  const pos = processNo - index;

  return (
    <div className={className}>
      <p>{title}</p>
      {index !== 0 && pos === 0 ? (
        <CancelBtn resetTab={resetTab} processNo={processNo} />
      ) : null}
    </div>
  );
};

export default TabItem;
