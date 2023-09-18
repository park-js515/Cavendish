import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FilterBox from "./FilterBox";
import PartList from "./PartList";

const PartBody = ({ partCategory, partSelect, setPartSelect }) => {
  return (
    <div>
      <FilterBox></FilterBox>
      <PartList></PartList>
    </div>
  );
};

export default PartBody;
