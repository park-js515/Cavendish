import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PartCard from "./PartCard";

const partlist = [1, 2, 3, 4, 5];

const PartList = () => {
  return (
    <div className="part-card-container container">
      {partlist.map((item, index) => {
        return <PartCard key={index}></PartCard>;
      })}
    </div>
  );
};

export default PartList;
