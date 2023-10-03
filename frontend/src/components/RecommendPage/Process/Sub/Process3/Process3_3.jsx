import { useState, useEffect, useRef } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

// redux
import { useDispatch, useSelector } from "react-redux";
import * as recom from "redux/recommendSlice";

// API
import { searchProgram } from "api/recommend";

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

const TopIcons = ({ onClick }) => {
  const [leftCol, setLeftCol] = useState("black");

  return (
    <div
      style={{
        height: "20px",
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <AiOutlineArrowLeft
        size="20"
        color={leftCol}
        onMouseEnter={() => {
          setLeftCol("red");
        }}
        onMouseLeave={() => {
          setLeftCol("black");
        }}
        onClick={onClick}
        style={{
          cursor: "pointer",
        }}
      />
    </div>
  );
};

// 소분류에 해당하는 것2
// 컴포넌트만 존재
// 컴포넌트 재사용 기존에 존재하던 것
const Process3_3 = ({ setSubProcess, selected }) => {
  const [data, setData] = useState([]);

  const check = useRef(false);
  useEffect(() => {
    if (check.current) {
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
    }

    return () => {
      if (!check.current) {
        check.current = true;
      }
    };
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <TopIcons
        onClick={() => {
          setSubProcess(0);
        }}
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
