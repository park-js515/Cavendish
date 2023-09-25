import { useSelector } from "react-redux";
import ItemList from "./ItemList";

// icon
import { FaSearch } from "react-icons/fa";

const Btn = ({ onClick }) => {
  return (
    <div onClick={onClick} className="btn">
      <FaSearch size="30" />
    </div>
  );
};

const SearchComponent = ({ value, setValue }) => {
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
      />
      <Btn
        onClick={() => {
          alert(value);
        }}
      />
    </div>
  );
};

export default SearchComponent;