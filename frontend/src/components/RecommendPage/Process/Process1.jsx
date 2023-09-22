import { useState, useEffect, useRef } from "react";
import { setTab } from "../Tab/TabGroup";
import Process1_1 from "./Sub/Process1/Process1_1";
import Process1_2 from "./Sub/Process1/Process1_2";

//redux
import { useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

// 1. 부품 사전 선택
// 검색 -> 부품 9개 고려해야 함
// 페이지네이션
const Process1 = ({ processHandler }) => {
  const dispatch = useDispatch();
  // subProcess1: [{0: Process1_1, 1: Process1_2, 2: go to Process2}]
  const [subProcess1, setSubProcess1] = useState(0);
  const isChecked = useRef(false);
  const NowComponent =
    subProcess1 === 0 ? Process1_1 : subProcess1 === 1 ? Process1_2 : null;

  useEffect(() => {
    if (!isChecked.current && subProcess1 === 2) {
      dispatch(recom.setProcessNo(0));
      processHandler(1);
    }
    return () => {
      if (!isChecked.current && subProcess1 === 2) {
        isChecked.current = true;
      }
    };
  }, [subProcess1]);

  return (
    <div className="process">
      <p>val: {subProcess1}</p>
      {NowComponent ? <NowComponent setSubProcess={setSubProcess1} /> : null}
    </div>
  );
};

export default Process1;
