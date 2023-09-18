import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FilterBox = () => {
  const cpuFilter = [
    "제조사",
    "코어 수",
    "쓰레드 수",
    "L3캐시",
    "TDP",
    "내장그래픽",
  ];
  const mainboardFilter = [
    "제조사",
    "CPU 소켓",
    "폼팩터",
    "메모리 종류",
    "메모리 개수",
    "M.2 개수",
    "M.2 연결",
    "무선랜 종류",
  ];
  return <div className="part-filter-box"></div>;
};

export default FilterBox;
