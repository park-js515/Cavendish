import { useState, useEffect, useRef } from "react";
import {
  AiOutlineBackward,
  AiOutlineCaretLeft,
  AiOutlineForward,
  AiOutlineCaretRight,
} from "react-icons/ai";

// redux
import { useDispatch, useSelector } from "react-redux";
import * as recom from "redux/recommendSlice";

// API
import { searchPart } from "api/recommend";

const Item = ({ imgUrl, name, id, compatibility, style }) => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => {
    return state.recommend.selected;
  });
  const selectedValue = useSelector((state) => {
    return state.recommend.processList[0][selected].value;
  });

  const disabled = compatibility.length > 0;
  const className = disabled
    ? "item-disabled"
    : selectedValue === name
    ? "item-selected"
    : "item";

  return (
    <div
      className={className}
      onClick={() => {
        if (className !== "item-disabled") {
          if (className === "item-selected") {
            dispatch(recom.removeProcessList0({ index: selected }));
            if (selected === 7) {
              dispatch(recom.setRamNo(0));
            }
          } else {
            dispatch(
              recom.setProcessList0({ value: name, imgUrl: imgUrl, id: id }),
            );
            if (selected === 7) {
              dispatch(recom.setRamNo(1));
            }
          }
        }
      }}
    >
      <div className="partImg">
        <div
          className="inner"
          style={{ backgroundImage: `url(${imgUrl})`, ...style }}
        ></div>
        {disabled ? (
          <div className="disabledList">
            <div style={{ fontWeight: "bolder" }}>호환되지 않은 부품</div>
            {compatibility.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    color: "red",
                    fontSize: "15px",
                    fontWeight: "bolder",
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="text">{name}</div>
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

const ItemList = ({ searchValue, doSearch, setDoSearch }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [maxValue, setMaxValue] = useState(1);
  const [nowSearchValue, setNowSearchValue] = useState("");

  const processList0 = useSelector((state) => {
    return state.recommend.processList[0];
  });
  const selectedItem = useSelector((state) => {
    const selected = state.recommend.selected;
    return state.recommend.processList[0][selected].name;
  });
  const getParams = (val = nowSearchValue) => {
    const params = { keyword: val };
    for (let item of processList0) {
      if (item.value !== "-1") {
        params[item.name] = item.id;
      }
    }

    return params;
  };

  // 초기 렌더링 시 데이터 호출
  const check1 = useRef(false);
  useEffect(() => {
    const fn1 = () => {
      const propPartName = selectedItem;
      const propPage = page;
      const propParams = getParams();
      const propSuccess = (response) => {
        const data = response.data;
        const arr = [];
        data.forEach((item) => {
          const { id, name, image, compatibility } = item;
          arr.push({
            name: name,
            imgUrl: image,
            id: id,
            compatibility: compatibility,
          });
        });

        setData(() => {
          return [...arr];
        });
      };
      const propFail = (error) => {
        console.log(error);
      };

      const props = [propPartName, propPage, propParams, propSuccess, propFail];
      searchPart(...props);
    };

    const fn2 = () => {
      const propPartName = selectedItem;
      const propPage = 1;
      const propParams = getParams();
      const propSuccess = (response) => {
        const data = response.data;
        if (data.length === 0) {
          setMaxValue(1);
        } else {
          const { max_page } = data[0];
          setMaxValue(max_page);
        }
      };
      const propFail = (error) => {
        console.log(error);
      };

      const props = [propPartName, propPage, propParams, propSuccess, propFail];
      searchPart(...props);
    };

    if (!check1.current) {
      fn1();
      fn2();
    }

    return () => {
      check1.current = true;
    };
  }, []);

  // 페이지가 바뀌거나 검색어가 바뀌었을 때의 호출
  // 추가: 부품이 바뀌었을 때도 고려
  useEffect(() => {
    const fn1 = (val, p = page) => {
      const propPartName = selectedItem;
      const propPage = p;
      const propParams = getParams(val);
      const propSuccess = (response) => {
        const data = response.data;
        const arr = [];
        data.forEach((item) => {
          const { id, name, image, compatibility } = item;
          arr.push({
            name: name,
            imgUrl: image,
            id: id,
            compatibility: compatibility,
          });
        });

        setData(() => {
          return [...arr];
        });
      };
      const propFail = (error) => {
        console.log(error);
      };

      const props = [propPartName, propPage, propParams, propSuccess, propFail];
      searchPart(...props);
    };

    const fn2 = () => {
      const propPartName = selectedItem;
      const propPage = 1;
      const propParams = getParams();
      const propSuccess = (response) => {
        const data = response.data;
        if (data.length === 0) {
          setMaxValue(1);
        } else {
          const { max_page } = data[0];
          setMaxValue(max_page);
        }
      };
      const propFail = (error) => {
        console.log(error);
      };

      const props = [propPartName, propPage, propParams, propSuccess, propFail];
      searchPart(...props);
    };

    const fn3 = () => {
      setNowSearchValue(searchValue);
      setPage(1);
      fn1(searchValue, 1);
      setDoSearch(false);
    };

    if (check1.current) {
      if (doSearch) {
        fn3();
        fn2();
        return;
      }

      fn1();
      fn2();
    }
  }, [page, doSearch, processList0]);

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
    <div className="item-list">
      <div className="item-group">
        {data.map((item, index) => {
          return <Item key={index} {...item} />;
        })}
      </div>
      <Pagenate {...footerProps} />
    </div>
  );
};

export default ItemList;
