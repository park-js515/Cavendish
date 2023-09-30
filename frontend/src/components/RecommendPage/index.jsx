import "styles/css/RecommendPage.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as recom from "redux/recommendSlice";

// ProgressBar
import ProgressBar from "./ProgressBar";

// Process
import Process1 from "./Process/Process1";
import Process2 from "./Process/Process2";
import Process3 from "./Process/Process3";
import Process4 from "./Process/Process4";
import Process5 from "./Process/Process5";
import ProcessEnd from "./Process/ProcessEnd";

// tab
import TabGroup from "./Tab/TabGroup";

const ProcessList = [
  Process1,
  Process2,
  Process3,
  Process4,
  Process5,
  ProcessEnd,
];

// useEffect를 사용해서 이미 견적을 짜고 있었을 때를 처리하기
// Yes -> 계속 작성
// No -> 처음부터 작성
const RecommendPageComponent = () => {
  const dispatch = useDispatch();
  const processNo = useSelector((state) => {
    return state.recommend.processNo + 1;
  });

  const check = useRef(false);
  useEffect(() => {
    if (!check.current && processNo >= 0) {
      const isValid = window.confirm(
        "이미 진행 중인 작업이 있습니다.\n계속하시겠습니까? ",
      );

      if (!isValid) {
        dispatch(recom.resetProcessAll());
      }
    }

    return () => {
      if (!check.current && processNo >= 0) {
        check.current = true;
      }
    };
  }, []);

  const NowProcess = ProcessList[processNo];

  return (
    <div className="recommend">
      <div className="top">
        <ProgressBar />
      </div>
      <div className="bottom">
        <div className="left">
          <div className="wrapper">
            <NowProcess className="process" />
          </div>
        </div>
        <div className="right">
          <TabGroup />
        </div>
      </div>
    </div>
  );
};

export default RecommendPageComponent;
