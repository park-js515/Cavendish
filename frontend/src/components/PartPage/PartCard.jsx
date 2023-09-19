import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const PartCard = () => {
  return (
    <div className="container">
      <div className="post">
        <div className="header_post">
          <img
            src="https://images.pexels.com/photos/2529973/pexels-photo-2529973.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            alt=""
          />
        </div>

        <div className="body_post">
          <div className="post_content">
            <h1>Lorem Ipsum</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
              animi assumenda cumque deserunt dolorum ex exercitationem.
            </p>

            <div className="container_infos">
              <div className="postedBy">
                <span>author</span> John Doe
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
