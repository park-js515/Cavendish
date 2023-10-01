import { useState, useEffect, useRef } from "react";

// redux
import { useDispatch, useSelector } from "react-redux";
import * as recom from "redux/recommendSlice";

// API
import { searchPart, maxPage } from "api/recommend";

const Item = ({ imgUrl, name, id, style }) => {
  const dispatch = useDispatch();
  const selected = useSelector((state) => {
    return state.recommend.selected;
  });
  const selectedValue = useSelector((state) => {
    return state.recommend.processList[0][selected].value;
  });
  const className = selectedValue === name ? "item-selected" : "item";

  return (
    <div
      className={className}
      onClick={() => {
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
      }}
    >
      <div className="partImg">
        <div
          className="inner"
          style={{ backgroundImage: `url(${imgUrl})`, ...style }}
        ></div>
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
        value="<<"
        type={1}
        onClick={() => {
          handlePageSub2();
        }}
        key={-1}
      />
      <Btn
        value="<"
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
        value=">"
        type={1}
        onClick={() => {
          handlePageAdd();
        }}
        key={-3}
      />
      <Btn
        value=">>"
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
          const { id, name, image } = item;
          arr.push({ name: name, imgUrl: image, id: id, disabled: false });
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
      const propSuccess = (response) => {
        setMaxValue(() => {
          return response.data.max_page;
        });
      };
      const propFail = (error) => {
        console.log(error);
      };

      const props = [propPartName, propSuccess, propFail];
      maxPage(...props);
    };

    if (!check1.current) {
      fn1();
      fn2();
    }

    return () => {
      check1.current = true;
    };
  }, []);

  useEffect(() => {
    const fn1 = (val, p = page) => {
      const propPartName = selectedItem;
      const propPage = p;
      const propParams = getParams(val);
      const propSuccess = (response) => {
        const data = response.data;
        const arr = [];
        data.forEach((item) => {
          const { id, name, image } = item;
          arr.push({ name: name, imgUrl: image, id: id, disabled: false });
        });

        setData(() => {
          return [...arr];
        });
        console.log(response);
      };
      const propFail = (error) => {
        console.log(error);
      };

      const props = [propPartName, propPage, propParams, propSuccess, propFail];
      searchPart(...props);
      console.log(props);
    };

    const fn2 = () => {};
    const fn3 = () => {
      setNowSearchValue(searchValue);
      setPage(1);
      fn1(searchValue, 1);
      setDoSearch(false);
    };

    if (doSearch) {
      fn2();
      fn3();
      return;
    }

    fn1();
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
