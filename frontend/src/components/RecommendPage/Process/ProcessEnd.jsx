import Loading from "components/common/Loading";
import { useState, useEffect, useRef } from "react";
import _ from "lodash";

//redux
import { useDispatch, useSelector } from "react-redux";

// API
import { getQuotation } from "api/recommend";

const Item = ({ id, name, price, image }) => {
  return <></>;
};

const ProcessEnd = ({ className }) => {
  const dispatch = useDispatch();
  const processList = useSelector((state) => {
    return state.recommend.processList;
  });
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

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
          const arr = [];
          data.forEach((item) => {
            const temp = {};
            for (const key in item) {
              const part = item[key];
              const { id, name, price, image } = part;
              temp[key] = { id, name, price, image };
            }
            arr.push(temp);
          });

          setData1(_.cloneDeep(arr.slice(0, 5)));
          setData2(_.cloneDeep(arr.slice(5)));
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
      <div className="proc-end">
        <div className="end-left">
          <div className="title">권장 사양</div>
          <div className="inner-wrapper">
            {data1.map((item) => {
              return <div>ㅎㅇ</div>;
            })}
          </div>
        </div>
        <div className="end-right">
          <div className="title">최소 사양</div>
          <div className="inner-wrapper">
            {data2.map((item) => {
              return <div>ㅈㅈ</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessEnd;
