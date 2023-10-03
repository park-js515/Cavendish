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
      <ImCancelCircle
        color={toggle ? col2 : col1}
        size="25"
        style={{ transition: "all 200ms ease-in-out" }}
      />
    </div>
  );
};

const CustomAiFillPlusCircle = ({ style, ...props }) => {
  const [col, setCol] = useState("black");

  return (
    <AiFillPlusCircle
      {...props}
      color={col}
      onMouseEnter={() => {
        setCol("red");
      }}
      onMouseLeave={() => {
        setCol("black");
      }}
      style={{ ...style }}
    />
  );
};

const CustomAiFillMinusCircle = ({ style, ...props }) => {
  const [col, setCol] = useState("black");

  return (
    <AiFillMinusCircle
      {...props}
      color={col}
      onMouseEnter={() => {
        setCol("red");
      }}
      onMouseLeave={() => {
        setCol("black");
      }}
      style={{ ...style }}
    />
  );
};

const CustomBsFillTrash3Fill = ({ style, ...props }) => {
  const [col, setCol] = useState("black");

  return (
    <BsFillTrash3Fill
      {...props}
      color={col}
      onMouseEnter={() => {
        setCol("red");
      }}
      onMouseLeave={() => {
        setCol("black");
      }}
      style={{ ...style }}
    />
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
              <span>{`${item.name}: ${item.value}`}</span>
              <span
                style={{ fontWeight: "bolder" }}
              >{`(${recommend.ramNo})`}</span>
              <div className="wrapper2">
                <CustomAiFillMinusCircle
                  size="20"
                  onClick={() => {
                    handleRam(-1);
                  }}
                  style={{
                    cursor: "pointer",
                    transition: "all 200ms ease-in-out",
                  }}
                />
                <CustomAiFillPlusCircle
                  size="20"
                  onClick={() => {
                    handleRam(1);
                  }}
                  style={{
                    cursor: "pointer",
                    transition: "all 200ms ease-in-out",
                  }}
                />
                <CustomBsFillTrash3Fill
                  size="15"
                  onClick={() => {
                    dispatch(
                      recom.removeProcessList0({
                        index: index,
                      }),
                    );
                    dispatch(recom.setRamNo(0));
                  }}
                  style={{
                    cursor: "pointer",
                    transition: "all 200ms ease-in-out",
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="wrapper2" key={index}>
              {`${item.name}: ${item.value}`}
              <div className="wrapper2">
                <CustomBsFillTrash3Fill
                  size="15"
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
              <div className="wrapper2">{`${itemsIndex + 1}: ${items}`}</div>
              {data2[items].map((item, itemIndex) => {
                return (
                  <div className="wrapper2" key={itemIndex}>
                    &nbsp;{`- ${item.value}`}
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
    const processList0 = recommend.processList[0];
    const cnt = processList0.reduce((tot, cur) => {
      if (cur.is_have) {
        return tot + 1;
      }
      return tot;
    }, 0);

    return (
      <div>
        <div
          className="wrapper2"
          style={{ fontWeight: "bolder" }}
        >{`예산: ${data.budget} 만원`}</div>
        <div className="wrapper2">{`보유 중인 부품 수: ${cnt}`}</div>
      </div>
    );
  };

  const TabContent4 = () => {
    const data = recommend.processList[4];

    return (
      <div>
        {Object.keys(data).map((key) => {
          return (
            <div key={key} className="wrapper2">{`${key}: ${data[key]}`}</div>
          );
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
  const style = { color: "red", transition: "all 200ms ease-in-out" };

  return (
    <div className={className}>
      <div
        className="wrapper"
        style={pos === -1 ? style : { transition: "all 200ms ease-in-out" }}
      >
        {title} {pos === 0 ? <CancelBtn /> : null}
      </div>
      {pos >= -1 ? <Content /> : null}
    </div>
  );
};

export default TabItem;
