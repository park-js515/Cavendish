import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FilterBox from "./FilterBox";
import PartList from "./PartList";

const PartBody = ({ partCategory, partName }) => {
  return (
    <div className="part-body">
      <FilterBox partName={partName}></FilterBox>
      <PartList partName={partName}></PartList>
    </div>
  );
};

export default PartBody;
