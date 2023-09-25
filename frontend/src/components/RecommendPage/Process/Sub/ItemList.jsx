import { useState, useEffect, useRef } from "react";
import defaultCPU from "assets/defaultImgs/default-cpu.avif";

// axios

// redux
import { useDispatch, useSelector } from "react-redux";
import * as recom from "redux/recommendSlice";

const dummy = [
  { imgUrl: defaultCPU, name: "dummy" },
  { imgUrl: defaultCPU, name: "dummy" },
  { imgUrl: defaultCPU, name: "dummy" },
  { imgUrl: defaultCPU, name: "dummy" },
  { imgUrl: defaultCPU, name: "dummy" },
  { imgUrl: defaultCPU, name: "dummy" },
  { imgUrl: defaultCPU, name: "dummy" },
  { imgUrl: defaultCPU, name: "dummy" },
  { imgUrl: defaultCPU, name: "dummy" },
  { imgUrl: defaultCPU, name: "dummy" },
];

const maxValue = 72; // 추후 axios로 받아올 값
const itemsPerPage = 10; // 확정은 아닌 값

// 클릭 시 confirm을 띄운 후 redux 업데이트 여부 결정
const Item = ({ imgUrl, name, style }) => {
  return (
    <div className="item" onClick={() => {alert("향후에 추가될 기능")}}>
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

// 1 번째 게시물의 위치 -> (1 - 1) * 10 + 0
// 2 번째 게시물의 위치 -> (1 - 1) * 10 + 1
// ...
// 11 번째 게시물의 위치 -> (2 - 1) * 10 + 0
const ItemList = () => {
  const selectedItem = useSelector((state) => {
    const selected = state.recommend.selected;
  });
  const [page, setPage] = useState(1);
  const [data, setData] = useState(dummy);

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
  // 페이지가 달라지면 axios 요청을 통해서 리스트를 갱신해야 한다.
  // useEffect(() => {
  //   페이지 갱신 -> 데이터 수정
  // }, [page])

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
