import { useState, useEffect, useRef } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineBackward,
  AiOutlineCaretLeft,
  AiOutlineForward,
  AiOutlineCaretRight,
} from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

// redux
import { useDispatch, useSelector } from "react-redux";
import * as recom from "redux/recommendSlice";

// API
import { searchProgram } from "api/recommend";

const Item = ({ imgUrl, value, selected }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => {
    return state.recommend.processList[2][selected];
  });

  const className = list.includes(value) ? "item-active" : "item";

  const onClick = () => {
    if (list.includes(value)) {
      dispatch(recom.removeProcessList2({ key: selected, value: value }));
    } else {
      dispatch(recom.addProcessList2({ key: selected, value: value }));
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
      <div className="item-bot">{value}</div>
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

const Btn = ({ onClick }) => {
  return (
    <div onClick={onClick} className="btn">
      <FaSearch size="30" />
    </div>
  );
};

const SearchComponent = ({ selected, value, setValue, setDoSearch }) => {
  const onChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="search-wrapper">
      <input
        id={selected}
        value={value}
        onChange={onChange}
        className="search"
        placeholder={`${selected}명을 입력하세요!`}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setDoSearch(true);
          }
        }}
      />
      <Btn
        onClick={() => {
          setDoSearch(true);
        }}
      />
    </div>
  );
};

const Pagenate = ({
  page,
  maxValue,
  handlePage,
  handlePageAdd,
  handlePageAdd2,
  handlePageSub,
  handlePageSub2,
}) => {
  const Btn = ({ value, type, onClick }) => {
    const classNames = [
      page === value ? "btn-active" : "btn-default",
      "btn-side",
    ];
    return (
      <div onClick={onClick} className={classNames[type]}>
        {value}
      </div>
    );
  };

  const cur10 = Math.floor((page - 1) / 10);
  const temp1 = cur10 * 10;
  const temp2 = maxValue - temp1;
  const list = new Array(10).fill(0).map((_, index) => temp1 + index + 1);
  list.splice(temp2);

  return (
    <div className="footer">
      <Btn
        value={<AiOutlineBackward />}
        type={1}
        onClick={() => {
          handlePageSub2();
        }}
        key={-1}
      />
      <Btn
        value={<AiOutlineCaretLeft />}
        type={1}
        onClick={() => {
          handlePageSub();
        }}
        key={-2}
      />
      {list.map((item) => {
        return (
          <Btn
            key={item}
            value={item}
            type={0}
            onClick={() => {
              handlePage(item);
            }}
          />
        );
      })}
      <Btn
        value={<AiOutlineCaretRight />}
        type={1}
        onClick={() => {
          handlePageAdd();
        }}
        key={-3}
      />
      <Btn
        value={<AiOutlineForward />}
        type={1}
        onClick={() => {
          handlePageAdd2();
        }}
        key={-4}
      />
    </div>
  );
};

// 소분류에 해당하는 것1
// 검색 및 페이지네이션
// 컴포넌트 재사용 기존에 존재하던 것
// 게임만 사용할 것 -> selected가 필요하지 않음
const Process3_2 = ({ setSubProcess, selected }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [nowSearchText, setNowSearchText] = useState("");
  const [doSearch, setDoSearch] = useState(false);
  const [maxValue, setMaxValue] = useState(1);

  const maxPage = {
    게임: 772,
    "이미지 편집": 2,
    모델링: 2,
  };

  // 초기 렌더링 시 데이터 호출
  const check1 = useRef(false);
  useEffect(() => {
    const fn1 = () => {
      const propCategory = selected;
      const propPage = 1;
      const propParams = { keyword: "" };
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
    };

    if (!check1.current) {
      setMaxValue(maxPage[selected]);
      fn1();
    }

    return () => {
      if (!check1.current) {
        check1.current = true;
      }
    };
  }, []);

  // 페이지가 바뀌거나 검색어가 바뀌었을 때의 호출
  // useEffect(() => {
  //   if (check1.current) {}
  // }, [page, doSearch]);

  const handlePage = (value) => {
    setPage(value);
  };

  const handlePageAdd = () => {
    setPage((current) => {
      return Math.min(current + 1, maxValue);
    });
  };

  const handlePageAdd2 = () => {
    setPage((current) => {
      const cur10 = Math.floor((current - 1) / 10);
      return Math.min((cur10 + 1) * 10 + 1, maxValue);
    });
  };

  const handlePageSub = () => {
    setPage((current) => {
      return Math.max(current - 1, 1);
    });
  };

  const handlePageSub2 = () => {
    setPage((current) => {
      const cur10 = Math.floor((current - 1) / 10);
      return Math.max((cur10 - 1) * 10, 1);
    });
  };

  const footerProps = {
    page,
    maxValue,
    handlePage,
    handlePageAdd,
    handlePageAdd2,
    handlePageSub,
    handlePageSub2,
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <TopIcons
        onClick={() => {
          setSubProcess(0);
        }}
      />
      <div className="proc3-2">
        <SearchComponent
          selected={selected}
          value={text}
          setValue={setText}
          setDoSearch={setDoSearch}
        />
        <div className="item-wrapper">
          {data.map((item, index) => {
            return (
              <Item
                key={index}
                selected={selected}
                imgUrl={item.imgUrl}
                value={item.value}
              />
            );
          })}
        </div>
        <Pagenate {...footerProps} />
      </div>
    </div>
  );
};

export default Process3_2;
