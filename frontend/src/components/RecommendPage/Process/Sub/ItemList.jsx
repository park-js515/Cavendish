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

const itemsPerPage = 10;

const Item = ({ imgUrl, name }) => {
  const selectedItem = useSelector((state) => {
    const selected = state.recommend.selected;
  });
  return <div className="item"></div>;
};

const Pagenate = (maxValue) => {
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
      const cur10 = current % 10;
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
      const cur10 = current % 10;
      current = Math.max((cur10 - 1) * 10 + 9, 1);
    });
  };
  // 페이지가 달라지면 axios 요청을 통해서 리스트를 갱신해야 한다.
  // useEffect(() => {
  //   페이지 갱신
  // }, [page])

  return (
    <div className="item-list">
      <div className="item-group"></div>
      <div className="footer"></div>
    </div>
  );
};

export default ItemList;
