import { useState, useEffect, useRef } from "react";
import _ from "lodash";
import { useModal, Modal } from "./Sub/Process5/Modal";

//redux
import { useDispatch, useSelector } from "react-redux";

// API
import { getQuotation } from "api/recommend";

const Item = ({ index, item }) => {
  const addComma = (num) => {
    const st = num.toString();

    return st.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const { isOpen, handleIsOpen } = useModal();

  return (
    // <div style={{ height: "100%", width: "100%" }}>
    <div
      className="item"
      onClick={() => {
        handleIsOpen((current) => !current);
      }}
    >
      <div className="item-left">
        <div
          className="case"
          style={{ backgroundImage: `url(${item.case.image})` }}
        >
          <div className="index">{`${index + 1}`}</div>
        </div>
      </div>
      <div className="item-right">{`~ ${addComma(item.total)}원`}</div>
      <Modal item={item} isOpen={isOpen} handleIsOpen={handleIsOpen}></Modal>
    </div>
    // </div>
  );
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
            let total = 0;
            for (const key in item) {
              const part = item[key];
              const { id, name, price, image } = part;
              temp[key] = { id, name, price, image };
              total += price;
            }
            temp.total = total;
            arr.push(temp);
            console.log(temp);
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
          <div className="title">추천 권장 사양</div>
          <div className="inner-wrapper">
            {data1.map((item, index) => {
              return <Item key={index} index={index} item={item} />;
            })}
          </div>
        </div>
        <div className="end-right">
          <div className="title">추천 최소 사양</div>
          <div className="inner-wrapper">
            {data2.map((item, index) => {
              return <Item key={index} index={index} item={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessEnd;
