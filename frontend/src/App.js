import NavBar from "components/common/NavBar";
import RouteComponent from "pages/lib/RouteComponent";
import { useLocation } from "react-router-dom";

const notUseNav = ["/", "/signup", "/login"];

function App() {
  const location = useLocation();
  return (
    <>
      {!notUseNav.includes(location.pathname) ? <NavBar /> : null}
      <RouteComponent />
    </>
  );
}

export default App;
