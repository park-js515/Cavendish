import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const PartCard = () => {
  return (
    <div className="container">
      <div className="post">
        <div className="header_post">
          <img src="/images/본체1.png" alt="" />
        </div>

        <div className="body_post">
          <div className="post_content">
            <h1>제품 이름</h1>
            <p>제품 제원 </p>

            <div className="container_infos">
              <div className="postedBy">
                <span>최저가</span> ￦1000,000
              </div>

              <div className="container_tags">
                <span>tags</span>
                <div className="tags">
                  <ul>
                    <li>design</li>
                    <li>front end</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartCard;
