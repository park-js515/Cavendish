import { useSelector } from "react-redux";
import dummyImg from "assets/defaultImgs2/Briar.png";

const list = [
  { imgUrl: dummyImg, usage: "pc 게임" },
  { imgUrl: dummyImg, usage: "인터넷 서핑, 사무, 영상 시청 등" },
  { imgUrl: dummyImg, usage: "개발" },
  { imgUrl: dummyImg, usage: "영상 편집 및 특수효과" },
  { imgUrl: dummyImg, usage: "방송, 스트리밍" },
  { imgUrl: dummyImg, usage: "포토샵 및 일러스트레이터" },
  { imgUrl: dummyImg, usage: "2D 및 3D 모델링" },
  { imgUrl: dummyImg, usage: "비디오 인코딩" },
  { imgUrl: dummyImg, usage: "음악 작곡 및 편집" },
];

const Item = ({ imgUrl, value, onClick }) => {
  return (
    <div className="item" onClick={onClick}>
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

// 대분류에 해당하는 것
// 대분류에 대응되는 컴포넌트
const Process3_1 = ({ setSubProcess, setSlected }) => {
  const usage = useSelector((state) => {
    return state.recommend.processList[1];
  });

  return (
    <>
      {usage.map((item) => {
        const index = list.findIndex((elem) => {
          return elem.usage === item;
        });
        const imgUrl = list[index].imgUrl;
        const onClick = () => {
          if (item === "pc 게임") {
            setSubProcess(1);
          } else {
            setSubProcess(2);
          }
          setSlected(item);
        };
        return <Item imgUrl={imgUrl} value={item} onClick={onClick} />;
      })}
    </>
  );
};

export default Process3_1;
