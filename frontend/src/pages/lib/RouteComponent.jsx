import { Routes, Route } from "react-router-dom";
import BoardDetailPage from "pages/BoardDetailPage";
import BoardCreatePage from "pages/BoardCreatePage";
import BoardUpdatePage from "pages/BoardUpdatePage";
import BoardPage from "pages/BoardPage";
import LoginPage from "pages/LoginPage";
import LogoutPage from "pages/LogoutPage";
import MainPage from "pages/MainPage";
import MyPage from "pages/MyPage";
import NotFound404 from "pages/NotFound404";
import QuotationPage from "pages/QuotationPage";
import RecommendPage from "pages/RecommendPage";
import QuotationDetailPage from "pages/QuotationDetailPage";
import { useSelector } from "../../../node_modules/react-redux/es/exports";

// 향후 파라미터가 포함될 페이지 (예상)
// part
// quotation

const RouteComponent = () => {
  const isLogin = useSelector((state) => state.user.isLogin);
  return (
    <Routes>
      {/* 로그인 필요 없는 기능 */}
      <Route path="/board/detail/:id" element={<BoardDetailPage />}></Route>
      <Route path="/board/:page" element={<BoardPage />}></Route>
      <Route path="/board/*" element={<BoardPage page="1" />} />
      <Route
        path="/login"
        element={isLogin ? <MainPage /> : <LoginPage />}
      ></Route>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/recommend" element={<RecommendPage />}></Route>
      <Route path="/*" element={<NotFound404 />}></Route>

      {/* 로그인 필요 기능 */}
      <Route
        path="/logout"
        element={isLogin ? <LogoutPage /> : <LoginPage />}
      ></Route>
      <Route
        path="/mypage"
        element={isLogin ? <MyPage /> : <LoginPage />}
      ></Route>
      <Route
        path="/board/update/:id"
        element={isLogin ? <BoardUpdatePage /> : <LoginPage />}
      ></Route>
      <Route
        path="/board/create"
        element={isLogin ? <BoardCreatePage /> : <LoginPage />}
      ></Route>
      <Route
        path="/quotation"
        element={isLogin ? <QuotationPage /> : <LoginPage />}
      ></Route>
      <Route
        path="/quotation/detail/:id"
        element={isLogin ? <QuotationDetailPage /> : <LoginPage />}
      ></Route>
    </Routes>
  );
};

export default RouteComponent;
