import { useState, useEffect, useRef } from "react";
import Process3_2 from "./Sub/Process3/Process3_2";
import Process3_3 from "./Sub/Process3/Process3_3";

// redux
import { useDispatch, useSelector } from "react-redux";
import * as recom from "redux/recommendSlice";

// 3. 세부 용도 선택
const Process3 = ({ className }) => {
  const dispatch = useDispatch();
  const usages = useSelector((state) => {
    return state.recommend.processList[1];
  });

  const len = usages.length;
  const [subProcess3, setSubProcess3] = useState(0);
  const [selected, setSelected] = useState(usages[0]);
  const isChecked = useRef(false);
  const getComponent = () => {
    if (subProcess3 === len) {
      return null;
    }

    if (selected === "게임") {
      return Process3_2;
    }
    return Process3_3;
  };

  const NowComponent = getComponent();

  useEffect(() => {
    if (!isChecked.current && subProcess3 === len) {
      dispatch(recom.setProcessNo(2));
    }

    return () => {
      if (!isChecked.current && subProcess3 === len) {
        isChecked.current = true;
      }
    };
  }, [subProcess3]);

  return (
    <div className={className}>
      <div className="proc3">
        {NowComponent ? (
          <NowComponent
            subProcess={subProcess3}
            setSubProcess={setSubProcess3}
            selected={selected}
            setSelected={setSelected}
            len={len}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Process3;
