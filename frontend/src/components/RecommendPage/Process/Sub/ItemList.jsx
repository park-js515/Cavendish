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
  { imgUrl: defaultCPU, name: "dummy" },
];

const maxValue = 72; // 추후 axios로 받아올 값
const itemsPerPage = 10; // 확정은 아닌 값

const Item = ({ imgUrl, name }) => {
  const selectedItem = useSelector((state) => {
    const selected = state.recommend.selected;
  });
  return <div className="item"></div>;
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
      <button onClick={onClick} className={classNames[type]}>
        {value}
      </button>
    );
  };

  const cur10 = (page - 1) % 10;
  
  return <></>;
};

// 1 번째 게시물의 위치 -> (1 - 1) * 10 + 0
// 2 번째 게시물의 위치 -> (1 - 1) * 10 + 1
// ...
// 11 번째 게시물의 위치 -> (2 - 1) * 10 + 0
const ItemList = ({ maxValue }) => {
  const [page, setPage] = useState(1);

  const handlePage = (value) => {
    setPage(value);
  };

  const handlePageAdd = () => {
    setPage((current) => {
      current = Math.min(current + 1, maxValue);
    });
  };

  const handlePageAdd2 = () => {
    setPage((current) => {
      const cur10 = (current - 1) % 10;
      current = Math.min((cur10 + 1) * 10, maxValue);
    });
  };

  const handlePageSub = () => {
    setPage((current) => {
      current = Math.max(1, current - 1);
    });
  };

  const handlePageSub2 = () => {
    setPage((current) => {
      const cur10 = (current - 1) % 10;
      current = Math.max((cur10 - 1) * 10 + 9, 1);
    });
  };
  // 페이지가 달라지면 axios 요청을 통해서 리스트를 갱신해야 한다.
  // useEffect(() => {
  //   페이지 갱신
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
      <div className="item-group">{}</div>
      <Pagenate {...footerProps} />
    </div>
  );
};

export default ItemList;
