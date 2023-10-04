import Loading from "components/common/Loading";
import { useState, useEffect, useRef } from "react";
import _ from "lodash";

//redux
import { useDispatch, useSelector } from "react-redux";
import * as recom from "redux/recommendSlice";

// API
import { getQuotation } from "api/recommend";

const ProcessEnd = ({ className }) => {
  const dispatch = useDispatch();
  const processList = useSelector((state) => {
    return state.recommend.processList;
  });

  const propParts = {};
  processList[0].forEach((item) => {
    const { name, id, is_have } = item;
    propParts[name] = { id, is_have };
  });
  const propRamNo = useSelector((state) => {
    return state.recommend.ramNo;
  });
  const propBudget = processList[3].budget;
  const propUsage = processList[1];
  const propPrograms = [];
  for (const key in processList[2]) {
    const tempArr = processList[2][key];
    tempArr.forEach((item) => {
      propPrograms.push(item.id);
    });
  }
  const propPriority = [];
  for (const key in processList[4]) {
    propPriority.push(processList[4][key]);
  }

  const props = {
    ..._.cloneDeep(propParts),
    ram_num: propRamNo,
    budget: propBudget * 10000, 
    usage: [...propUsage],
    programs: [...propPrograms],
    priority: [...propPriority],
  };

  const check = useRef(false);
  useEffect(() => {
    if (!check.current) {
      getQuotation(
        { ...props },
        (response) => {
          const data = response.data;
          console.log(data);
        },
        (error) => {
          console.error(error);
        },
      );
    }

    return () => {
      check.current = true;
    };
  }, []);

  return (
    <div className={className}>
      <p>ProcesssEnd</p>
      {JSON.stringify(props)}
    </div>
  );
};

export default ProcessEnd;
