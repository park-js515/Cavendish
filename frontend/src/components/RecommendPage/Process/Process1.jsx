import { useState, useEffect, useRef } from "react";
import Process1_1 from "./Sub/Process1/Process1_1";
import Process1_2 from "./Sub/Process1/Process1_2";
import PartSelect from "./Sub/Process1/PartSelect";

//redux
import { useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

const subProcessList = [Process1_1, Process1_2, PartSelect];

// 1. 부품 사전 선택
const Process1 = ({ className }) => {
  const dispatch = useDispatch();
  // subProcess1: [{0: Process1_1, 1: Process1_2, 2: PartSelect, 2: go to Process2}]
  const [subProcess1, setSubProcess1] = useState(0);
  const isChecked = useRef(false);
  const NowComponent = subProcess1 <= 2 ? subProcessList[subProcess1] : null;
  useEffect(() => {
    if (!isChecked.current && subProcess1 === 3) {
      dispatch(recom.setProcessNo(0));
      setSubProcess1(0);
    }
    return () => {
      if (!isChecked.current && subProcess1 === 3) {
        isChecked.current = true;
      }
    };
  }, [subProcess1]);

  return (
    <div className={className}>
      {NowComponent ? <NowComponent setSubProcess={setSubProcess1} /> : null}
    </div>
  );
};

export default Process1;
