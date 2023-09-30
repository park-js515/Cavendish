import dummyImg from "assets/defaultImgs2/Briar.png";

//redux
import { useSelector, useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

// 후에 axios로 데이터를 받아야하며, 컴포넌트화가 필요하다.
// Subprocess가 필요하다.
const dummy = [
  { imgUrl: dummyImg, program: "리그오브레전드" },
  { imgUrl: dummyImg, program: "오버워치2" },
  { imgUrl: dummyImg, program: "GTA5" },
  { imgUrl: dummyImg, program: "발로란트" },
  { imgUrl: dummyImg, program: "심즈4" },
  { imgUrl: dummyImg, program: "콜오브듀티:워존2.0" },
  { imgUrl: dummyImg, program: "카운터스트라이크:글로벌오펜시브" },
  { imgUrl: dummyImg, program: "포트나이트" },
  { imgUrl: dummyImg, program: "마인크래프트" },
  { imgUrl: dummyImg, program: "로블록스" },
];

const temp = 3 - (dummy.length % 3);
for (let i = 0; i < temp; i++) {
  dummy.push({ imgUrl: "", usage: "" });
}

const Item = ({ imgUrl, program }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    const value = program
      ? window.confirm("해당 용도를 선택하시겠습니까?")
      : false;

    if (value) {
      dispatch(recom.setProcess({ program }));
      dispatch(recom.setProcessNo(2));
    }
  };

  if (imgUrl) {
    return (
      <div className="item" onClick={onClick}>
        <div
          className="item-top"
          style={{
            backgroundImage: `url(${imgUrl})`,
            visibility: program ? "visible" : "hidden",
          }}
        ></div>
        <div className="item-bot">{program}</div>
      </div>
    );
  }

  return <div className="item-hidden"></div>;
};

// 3. 용도 선택 자세히
// 입력창?
const Legacy = ({ className }) => {
  const dispatch = useDispatch();
  const usage = useSelector((state) => {
    return state.recommend.processList[1].usage;
  });

  return (
    <div className={className}>
      <div className="proc3">
        {dummy.map((item, index) => {
          return <Item key={index} {...item} />;
        })}
      </div>
    </div>
  );
};

export default Legacy;
