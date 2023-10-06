import { useState, useEffect, useRef } from "react";
import { ImArrowLeft, ImArrowRight } from "react-icons/im";

// redux
import { useDispatch, useSelector } from "react-redux";
import * as recom from "redux/recommendSlice";

// API
import { searchProgram } from "api/recommend";
import Swal from "sweetalert2";

const Item = ({ selected, id, imgUrl, value }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => {
    return state.recommend.processList[2][selected];
  });

  const isIncludes = list.some((item) => {
    return item.id === id;
  });
  const className = isIncludes ? "item-active" : "item";

  const onClick = () => {
    if (isIncludes) {
      dispatch(recom.removeProcessList2({ key: selected, id: id }));
    } else {
      dispatch(
        recom.addProcessList2({
          key: selected,
          id: id,
          value: value,
        }),
      );
    }
  };

  return (
    <div className={className} onClick={onClick}>
      <div
        className="item-top"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      ></div>
      <div className="item-bot">
        <div className="text">{value}</div>
      </div>
    </div>
  );
};

const TopIcons = ({
  selected,
  subProcess,
  setSubProcess,
  setSelected,
  len,
}) => {
  const dispatch = useDispatch();
  const usages = useSelector((state) => {
    return state.recommend.processList[1];
  });
  const hasItem = useSelector((state) => {
    const arr = state.recommend.processList[2];
    for (const key in arr) {
      for (let i of arr[key]) {
        return true;
      }
    }

    return false;
  });
  const [leftCol, setLeftCol] = useState("black");
  const [rightCol, setRightCol] = useState("black");

  const disabled = () => {
    return len - 1 === subProcess && !hasItem;
  };

  return (
    <div
      style={{
        height: "35px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <ImArrowLeft
        size="35"
        color={leftCol}
        onMouseEnter={() => {
          setLeftCol("red");
        }}
        onMouseLeave={() => {
          setLeftCol("black");
        }}
        onClick={() => {
          if (subProcess > 0) {
            setSubProcess((current) => {
              setSelected(usages[current - 1]);
              return current - 1;
            });
          } else {
            dispatch(recom.setProcessNo(0));
          }
        }}
        style={{
          cursor: "pointer",
        }}
      />
      <span>{selected}</span>
      <ImArrowRight
        size="35"
        color={disabled() ? "gray" : rightCol}
        onMouseEnter={() => {
          setRightCol("red");
        }}
        onMouseLeave={() => {
          setRightCol("black");
        }}
        onClick={() => {
          if (disabled()) {
            Swal.fire({
              icon: "warning",
              title: "호환성 에러",
              text: "세부용도에서 한 개 이상의 선택은 필수입니다.",
            });
            return;
          }

          setSubProcess((current) => {
            setSelected(usages[current + 1]);
            return current + 1;
          });
        }}
        style={{
          cursor: `${disabled() ? "not-allowed" : "pointer"}`,
          transition: "all 200ms ease-in-out",
        }}
      />
    </div>
  );
};

// 소분류에 해당하는 것2
// 컴포넌트만 존재
// 컴포넌트 재사용 기존에 존재하던 것
const Process3_3 = ({
  subProcess,
  setSubProcess,
  selected,
  setSelected,
  len,
}) => {
  const [data, setData] = useState([]);

  const check = useRef(false);
  useEffect(() => {
    // if (check.current) {
    const propCategory = selected;
    const propPage = 1;
    const propParams = {
      keyword: "",
    };
    const propSuccess = (response) => {
      const { data } = response;
      const arr = [];
      data.forEach((item) => {
        const { id, name, image } = item;
        arr.push({ id: id, value: name, imgUrl: image });
      });

      setData([...arr]);
    };
    const propFail = (error) => {
      console.error(error);
    };

    const props = [propCategory, propPage, propParams, propSuccess, propFail];
    searchProgram(...props);
    // }

    // return () => {
    //   if (!check.current) {
    //     check.current = true;
    //   }
    // };
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <TopIcons
        subProcess={subProcess}
        setSubProcess={setSubProcess}
        setSelected={setSelected}
        selected={selected}
        len={len}
      />
      <div className="proc3-3">
        {data.map((item, index) => {
          return <Item key={index} selected={selected} {...item} />;
        })}
      </div>
    </div>
  );
};

export default Process3_3;
