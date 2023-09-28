import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as recom from "redux/recommendSlice";
import { ImCancelCircle } from "react-icons/im";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsFillTrash3Fill } from "react-icons/bs";

const CancelBtn = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const col1 = `rgba(255, 0, 0, 0.5)`;
  const col2 = `rgba(255, 0, 0, 1)`;
  return (
    <div
      className="cancelBtn"
      onClick={() => {
        dispatch(recom.removeProcess());
      }}
      onMouseEnter={() => {
        setToggle(true);
      }}
      onMouseLeave={() => {
        setToggle(false);
      }}
    >
      <ImCancelCircle color={toggle ? col2 : col1} size="30" />
    </div>
  );
};

// pos < 0: 이미 선택된 것
// pos === -1: 취소 가능하게 할 것
// pos === 0: 현재 선택 중
// pos > 0: 미선택
const TabItem = ({ className, title, index }) => {
  const dispatch = useDispatch();
  const processNo = useSelector((state) => state.recommend.processNo);
  const pos = processNo - index;
  const recommend = useSelector((state) => {
    return state.recommend;
  });

  const TabContent0 = () => {
    const data = recommend.processList[0];
    const handleRam = (val) => {
      const value = recommend.ramNo + val;
      const ret = Math.min(2, Math.max(0, value));
      dispatch(recom.setRamNo(ret));
    };

    return (
      <div>
        {data.map((item, index) => {
          return item.value === "-1" ? null : item.name === "ram" ? (
            <div key={index} className="wrapper2">
              {`${item.name}: ${item.value}(${recommend.ramNo})`}
              <div className="wrapper2">
                <AiFillMinusCircle
                  size="25"
                  onClick={() => {
                    handleRam(-1);
                  }}
                  style={{ cursor: "pointer" }}
                />
                <AiFillPlusCircle
                  size="25"
                  onClick={() => {
                    handleRam(1);
                  }}
                  style={{ cursor: "pointer" }}
                />
                <BsFillTrash3Fill
                  size="20"
                  onClick={() => {
                    dispatch(
                      recom.removeProcessList0({
                        index: index,
                      }),
                    );
                    dispatch(recom.setRamNo(0));
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          ) : (
            <div className="wrapper2" key={index}>
              {`${item.name}: ${item.value}`}
              <div className="wrapper2">
                <BsFillTrash3Fill
                  size="20"
                  onClick={() => {
                    dispatch(
                      recom.removeProcessList0({
                        index: index,
                      }),
                    );
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const TabContent1 = () => {
    const data = recommend.processList[1];

    return (
      <div>
        {data.map((item, index) => {
          return (
            <div key={index} className="wrapper2">{`${
              index + 1
            }: ${item}`}</div>
          );
        })}
      </div>
    );
  };

  const TabContent2 = () => {
    const data1 = recommend.processList[1];
    const data2 = recommend.processList[2];
    return (
      <div>
        {data1.map((items, itemsIndex) => {
          return (
            <div key={itemsIndex}>
              <div className="wrapper2">
                {items}
              </div>
              {data2[items].map((item, itemIndex) => {
                return (
                  <div className="wrapper2" key={itemIndex}>
                    {item}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  const TabContent3 = () => {
    const data = recommend.processList[3];

    return <div className="wrapper2">{`${data.budget} 만원`}</div>;
  };

  const TabContent4 = () => {
    const data = recommend.processList[4];

    return (
      <div>
        {Object.keys(data).map((key) => {
          if (data[key]) {
            return (
              <div key={key} className="wrapper2">{`${key}: ${data[key]}`}</div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  const TabContent = [
    TabContent0,
    TabContent1,
    TabContent2,
    TabContent3,
    TabContent4,
  ];

  const Content = TabContent[index];

  return (
    <div className={className}>
      <div className="wrapper">
        {title} {pos === 0 ? <CancelBtn /> : null}
      </div>
      {pos >= -1 ? <Content /> : null}
    </div>
  );
};

export default TabItem;
