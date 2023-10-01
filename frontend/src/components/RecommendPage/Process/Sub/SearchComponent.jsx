import { useSelector } from "react-redux";

// icon
import { FaSearch } from "react-icons/fa";

const Btn = ({ onClick }) => {
  return (
    <div onClick={onClick} className="btn">
      <FaSearch size="30" />
    </div>
  );
};

const SearchComponent = ({ value, setValue, setDoSearch }) => {
  const selectedItem = useSelector((state) => {
    const selected = state.recommend.selected;
    return state.recommend.processList[0][selected].name;
  });

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="search-wrapper">
      <input
        id={selectedItem}
        value={value}
        onChange={onChange}
        className="search"
        placeholder={`${selectedItem}명을 입력하세요!`}
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

export default SearchComponent;
