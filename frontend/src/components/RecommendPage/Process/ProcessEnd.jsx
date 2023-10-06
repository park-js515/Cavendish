import { useState, useEffect, useRef } from "react";
import _ from "lodash";
import { useModal, Modal } from "./Sub/Process5/Modal";
import Loading from "components/common/Loading";
import { VscRefresh } from "react-icons/vsc";

//redux
import { useSelector, useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

// API
import { getQuotation } from "api/recommend";

const Item = ({ index, item, handleIsOpen, setNowItem }) => {
  const addComma = (num) => {
    const st = num.toString();

    return st.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div
      className="item"
      onClick={() => {
        setNowItem(item);
        handleIsOpen();
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
      <div className="item-right">{`${addComma(item.total)}원 ~`}</div>
    </div>
  );
};

const ProcessEnd = ({ className }) => {
  const dispatch = useDispatch();
  const processList = useSelector((state) => {
    return state.recommend.processList;
  });
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [nowItem, setNowItem] = useState({});
  const { isOpen, handleIsOpen } = useModal();

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
  const [loading, setLoading] = useState(true);

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

              if (id) {
                temp[key] = { id, name, price, image };
                total += price;
              }
            }
            temp.total = total;
            arr.push(temp);
          });

          setData1(_.cloneDeep(arr.slice(0, 5)));
          setData2(_.cloneDeep(arr.slice(5)));
          setLoading(false);
        },
        (error) => {
          setData1([]);
          setData2([]);
          setLoading(false);
        },
      );
    }

    return () => {
      check.current = true;
    };
  }, []);

  const [col, setCol] = useState("gray");

  return (
    <div className={className}>
      {isOpen ? (
        <Modal nowItem={nowItem} isOpen={isOpen} handleIsOpen={handleIsOpen} />
      ) : null}

      {loading ? <Loading /> : null}
      {!loading && data1.length > 0 ? (
        <div className="proc-end">
          <div className="end-left">
            <div className="inner-wrapper">
              {data1.map((item, index) => {
                return (
                  <Item
                    key={index}
                    index={index}
                    item={item}
                    handleIsOpen={handleIsOpen}
                    setNowItem={setNowItem}
                  />
                );
              })}
            </div>
          </div>
          <div className="end-right">
            <div className="inner-wrapper">
              {data2.map((item, index) => {
                return (
                  <Item
                    key={index}
                    index={index + 5}
                    item={item}
                    handleIsOpen={handleIsOpen}
                    setNowItem={setNowItem}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : loading ? null : (
        <div className="no-quotation">
          <div className="inner">
            <div>추천할 수 있는 견적이 없습니다.</div>
            <div
              className="btn"
              onMouseEnter={() => {
                setCol("black");
              }}
              onMouseLeave={() => {
                setCol("gray");
              }}
              onClick={() => {
                dispatch(recom.resetProcessAll());
              }}
            >
              <VscRefresh
                size="100px"
                color={col}
                style={{ transition: "all 200ms ease-in-out" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessEnd;
