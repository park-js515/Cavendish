import { useState, useEffect, useRef } from "react";
import Process3_1 from "./Sub/Process3/Process3_1";
import Process3_2 from "./Sub/Process3/Process3_2";
import Process3_3 from "./Sub/Process3/Process3_3";

// redux
import { useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

const subProcessList = [Process3_1, Process3_2, Process3_3];

// 3. 세부 용도 선택
const Process3 = ({ className }) => {
  const dispatch = useDispatch();
  // subProcess3: [{0: Process3_1, 1: Process3_2, 2: Process3_3, 2: go to Process4}]
  const [subProcess3, setSubProcess3] = useState(0);
  const [selected, setSelected] = useState("");
  const isChecked = useRef(false);
  const NowComponent = subProcess3 <= 2 ? subProcessList[subProcess3] : null;

  useEffect(() => {
    if (!isChecked.current && subProcess3 === 3) {
      dispatch(recom.setProcess(2));
      setSubProcess3(0);
    }

    return () => {
      if (!isChecked.current && subProcess3 === 3) {
        isChecked.current = true;
      }
    };
  }, [subProcess3]);

  return (
    <div className={className}>
      <div className="proc3">
        {NowComponent ? (
          <NowComponent
            setSubProcess={setSubProcess3}
            selected={selected}
            setSelected={setSelected}
          />
        ) : null}
      </div>
      ;
    </div>
  );
};

export default Process3;
