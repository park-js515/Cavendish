import { useTabs } from "hooks/default/useTabs";

const ToggleBtn = () => {
  const {currentItem, changeItem} = useTabs("Login", ["Login", "Signup"]);

  return <div className="tab-group">
    <div className="tab">Login</div>
    <div className="tab">Sign Up</div>
  </div>;
};

export default ToggleBtn;
