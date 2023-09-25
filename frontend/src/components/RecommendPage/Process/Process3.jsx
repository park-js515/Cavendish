import { setTab } from "../Tab/TabGroup";
import dummyImg from "assets/defaultImgs2/Briar.png";

//redux
import { useSelector, useDispatch } from "react-redux";
import * as recom from "redux/recommendSlice";

const dummy = [
  { imgUrl: dummyImg, program: "pc 게임" },
  { imgUrl: dummyImg, program: "인터넷 서핑" },
  { imgUrl: dummyImg, program: "영상 시청" },
  { imgUrl: dummyImg, program: "사무" },
  { imgUrl: dummyImg, program: "개발" },
  { imgUrl: dummyImg, program: "영상편집 및 특수효과" },
  { imgUrl: dummyImg, program: "방송, 스트리밍" },
  { imgUrl: dummyImg, program: "포토샵" },
  { imgUrl: dummyImg, program: "VFX 작업" },
  { imgUrl: dummyImg, program: "비디오 인코딩" },
];

// 3. 용도 선택 자세히
// 입력창?
const Process3 = ({ className }) => {
  const dispatch = useDispatch();
  const usage = useSelector((state) => {
    return state.recommend.processList[1].usage;
  });

  return (
    <div className={className}>
      <div className="proc3">
        <button
          onClick={() => {
            dispatch(recom.setProcessNo(0));
          }}
        >
          back
        </button>
        <button
          onClick={() => {
            dispatch(recom.setProcessNo(2));
          }}
        >
          go
        </button>
      </div>
    </div>
  );
};

export default Process3;
