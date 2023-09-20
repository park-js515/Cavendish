import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import SideBar from "../components/PartPage/SideBar";
import PartBody from "../components/PartPage/PartBody";
import "../styles/css/PartPage.css";

const partCategory = [
  "CPU",
  "그래픽카드",
  "메인보드",
  "RAM",
  "SDD",
  "HDD",
  "쿨러",
  "파워",
  "케이스",
];

const PartPage = () => {
  const partName = useParams().partname;

  return (
    <div className="part-contents">
      <SideBar partCategory={partCategory} partName={partName}></SideBar>
      <PartBody partCategory={partCategory} partName={partName}></PartBody>
    </div>
  );
};

export default PartPage;
