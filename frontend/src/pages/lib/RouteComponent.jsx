import { Routes, Route } from "react-router-dom";
import BoardPage from "pages/BoardPage";
import LoginPage from "pages/LoginPage";
import MainPage from "pages/MainPage";
import MyPage from "pages/MyPage";
import NotFound404 from "pages/NotFound404";
import PartPage from "pages/PartPage";
import QuotationPage from "pages/QuotationPage";
import RecommendPage from "pages/RecommendPage";
import SignupPage from "pages/SignupPage";

// 향후 파라미터가 포함될 페이지 (예상)
// part
// quotation

const RouteComponent = () => {
  return (
      <Routes>
        <Route path="/board" element={<BoardPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/part" element={<PartPage />}></Route>
        <Route path="/quotation" element={<QuotationPage />}></Route>
        <Route path="/recommend" element={<RecommendPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/*" element={<NotFound404 />}></Route>
      </Routes>
  );
};

export default RouteComponent;
