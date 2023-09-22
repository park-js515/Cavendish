import { setTab } from "../Tab/TabGroup";

//redux
import { useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

// 1. 부품 사전 선택
// 검색 -> 부품 9개 고려해야 함
// 페이지네이션
// (필터링)
// (정렬)
const Process1 = ({ processHandler }) => {
  return (
    <div className="process">
      <p>Process1</p>
    </div>
  );
};

export default Process1;
