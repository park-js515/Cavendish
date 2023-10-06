import { useState, useEffect, useRef } from "react";
import { ImArrowLeft, ImArrowRight } from "react-icons/im";
import {
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

// defaultImgs2
import gameImg from "assets/defaultImgs2/default_game.png";
import officeImg from "assets/defaultImgs2/default_office.png";
import developImg from "assets/defaultImgs2/default_develop.png";
import videoEditImg from "assets/defaultImgs2/default_videoEdit.png";
import broadcastImg from "assets/defaultImgs2/default_broadcast.png";
import imgEditImg from "assets/defaultImgs2/default_imgEdit.png";
import modelingImg from "assets/defaultImgs2/default_modeling.png";
import encodingImg from "assets/defaultImgs2/default_encoding.png";
import musicImg from "assets/defaultImgs2/default_music.png";

// defaultImg3
import noDataImg from "assets/defaultImgs3/no-search-data.png";
import Swal from "sweetalert2";

const defaultImgList = [
  { imgUrl: gameImg, usage: "게임" },
  { imgUrl: officeImg, usage: "사무" },
  { imgUrl: developImg, usage: "개발" },
  { imgUrl: videoEditImg, usage: "영상 편집" },
  { imgUrl: broadcastImg, usage: "방송" },
  { imgUrl: imgEditImg, usage: "이미지 편집" },
  { imgUrl: modelingImg, usage: "모델링" },
  { imgUrl: encodingImg, usage: "인코딩" },
  { imgUrl: musicImg, usage: "음악 작업" },
];

const Item = ({ selected, id, imgUrl, value }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => {
    return state.recommend.processList[2][selected];
  });

  const defaultImg = () => {
    const index = defaultImgList.findIndex((item) => {
      return item.usage === selected;
    });

    return defaultImgList[index].imgUrl;
  };
  const isIncludes = list.some((item) => {
    return item.id === id;
  });
  const className = isIncludes ? "item-active" : "item";

  const onClick = () => {
    if (isIncludes) {
      dispatch(recom.removeProcessList2({ key: selected, id: id }));
    } else {
      dispatch(recom.addProcessList2({ key: selected, id: id, value: value }));
    }
  };

  return (
    <div className={className} onClick={onClick}>
      <div
        className="item-top"
        style={{
          backgroundImage: `url(${imgUrl ? imgUrl : defaultImg()})`,
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
      {selected}
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

const Btn = ({ onClick }) => {
  return (
    <div onClick={onClick} className="btn">
      <FaSearch size="30" />
    </div>
  );
};

const SearchComponent = ({
  selected,
  value,
  setValue,
  subProcess,
  setSubProcess,
  setDoSearch,
}) => {
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
        autoComplete="off"
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
const Process3_2 = ({
  subProcess,
  setSubProcess,
  selected,
  setSelected,
  len,
}) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([{}]);
  const [text, setText] = useState("");
  const [nowSearchText, setNowSearchText] = useState("");
  const [doSearch, setDoSearch] = useState(false);
  const [maxValue, setMaxValue] = useState(1);

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

        if (data.length > 0) {
          setMaxValue(data[0].max_page);
        } else {
          setMaxValue(setMaxValue(1));
        }
        setData([...arr]);
      };
      const propFail = (error) => {
        console.error(error);
      };

      const props = [propCategory, propPage, propParams, propSuccess, propFail];
      searchProgram(...props);
    };

    // if (!check1.current) {
    fn1();
    // }

    // return () => {
    //   if (!check1.current) {
    //     check1.current = true;
    //   }
    // };
  }, []);

  // 페이지가 바뀌거나 검색어가 바뀌었을 때의 호출
  useEffect(() => {
    const fn1 = () => {
      const propCategory = selected;
      const propPage = page;
      const propParams = { keyword: nowSearchText };
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

    const fn2 = () => {
      const propCategory = selected;
      const propPage = 1;
      const propParams = { keyword: text };
      const propSuccess = (response) => {
        const { data } = response;
        const arr = [];
        data.forEach((item) => {
          const { id, name, image } = item;
          arr.push({ id: id, value: name, imgUrl: image });
        });

        if (data.length > 0) {
          setMaxValue(data[0].max_page);
        } else {
          setMaxValue(setMaxValue(1));
        }

        setData([...arr]);
      };
      const propFail = (error) => {
        console.error(error);
      };

      const props = [propCategory, propPage, propParams, propSuccess, propFail];
      searchProgram(...props);

      setDoSearch(false);
      setPage(1);
      setNowSearchText(text);

      // 검색 결과에 따른 최대 페이지 수 지정이 필요함.
      // API가 필요함
    };

    // if (check1.current) {
    if (doSearch) {
      fn2();
      return;
    }

    fn1();
    // }
  }, [page, doSearch]);

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
        subProcess={subProcess}
        setSubProcess={setSubProcess}
        setSelected={setSelected}
        selected={selected}
        len={len}
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
            return <Item key={index} selected={selected} {...item} />;
          })}
          {data.length === 0 ? (
            <div
              className="no-data"
              style={{
                backgroundImage: `url(${noDataImg})`,
              }}
            ></div>
          ) : null}
        </div>
        <Pagenate {...footerProps} />
      </div>
    </div>
  );
};

export default Process3_2;
