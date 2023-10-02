import { useState, useEffect, useRef } from "react";
import dummyImg from "assets/defaultImgs2/Briar.png";
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

const dummy = [
  { imgUrl: dummyImg, value: "pc 게임" },
  { imgUrl: dummyImg, value: "인터넷 서핑, 사무, 영상 시청 등" },
  { imgUrl: dummyImg, value: "개발" },
  { imgUrl: dummyImg, value: "영상 편집 및 특수효과" },
  { imgUrl: dummyImg, value: "방송, 스트리밍" },
  { imgUrl: dummyImg, value: "포토샵 및 일러스트레이터" },
  { imgUrl: dummyImg, value: "2D 및 3D 모델링" },
  { imgUrl: dummyImg, value: "비디오 인코딩" },
  { imgUrl: dummyImg, value: "음악 작곡 및 편집" },
  { imgUrl: dummyImg, value: "아무거나" },
];

const selected = "pc 게임";

const Item = ({ imgUrl, value }) => {
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

const SearchComponent = ({ value, setValue }) => {
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
      />
      <Btn
        onClick={() => {
          alert(value);
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
const Process3_2 = ({ setSubProcess }) => {
  const [data, setData] = useState(dummy);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const [maxValue, setMaxValue] = useState(42);

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
        <SearchComponent value={text} setValue={setText} />
        <div className="item-wrapper">
          {data.map((item, index) => {
            return <Item key={index} imgUrl={item.imgUrl} value={item.value} />;
          })}
        </div>
        <Pagenate {...footerProps} />
      </div>
    </div>
  );
};

export default Process3_2;
