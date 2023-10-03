import { deleteQuotation, getQuotationDetail } from "api/quotation";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function QuotationDetailComponent() {
  const { id } = useParams();

  const [quotation, setQuotation] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getQuotationDetail(
      id,
      (response) => {
        const data = response.data.response;
        console.log(data);
        setQuotation(data);
      },
      () => {},
    );
  }, []);

  const quotationUpdatebutton = () => {
    navigate(`/quotation/update/${id}`)
  }


  const quotationDeleteHandler = () => {
    deleteQuotation(
      id,
      () => {
        navigate(-1);
      },
      () => {},
    );
  };

  return (
    <div className="quotation_detail_page">
      <div className="quotation_detail_content">
        <div className="title">{quotation.name}</div>
        <div className="quotation_info_form">
          <div className="left">
            <div className="quotation_info_container">
              <div className="quotation_img">
                <img src={quotation.caseImage} alt="case_image" />
              </div>
              <div className="quotation_info">
                <div className="parts_name">{quotation.caseName}</div>
                <div className="parts_price">가격 : {quotation.casePrice} 원</div>
              </div>
            </div>

            <div className="quotation_info_container">
              <div className="quotation_img">
                <img src={quotation.cpuImage} alt="cpu_image" />
              </div>
              <div className="quotation_info">
                <div className="parts_name">{quotation.cpuName}</div>
                <div className="parts_price">가격 : {quotation.cpuPrice} 원</div>
              </div>
            </div>
            <div className="quotation_info_container">
              <div className="quotation_img">
                <img src={quotation.gpuImage} alt="gpu_image" />
              </div>
              <div className="quotation_info">
                <div className="parts_name">{quotation.gpuName}</div>
                <div className="parts_price">가격 : {quotation.gpuPrice} 원</div>
              </div>
            </div>

            <div className="quotation_info_container">
              <div className="quotation_img">
                <img
                  src={quotation.mainboardImage}
                  alt="mainboard_image"
                />
              </div>
              <div className="quotation_info">
                <div className="parts_name">{quotation.mainboardName}</div>
                <div className="parts_price">
                  가격 : {quotation.mainboardPrice} 원
                </div>
              </div>
            </div>

            <div className="quotation_info_container">
              <div className="quotation_img">
                <img src={quotation.ramImage} alt="ram_image" />
              </div>
              <div className="quotation_info">
                <div className="parts_name">{quotation.ramName}</div>
                <div className="parts_price">가격 : {quotation.ramPrice} 원</div>
              </div>
            </div>
          </div>

          <div className="right">
            <div className="quotation_info_container">
              <div className="quotation_img">
                <img src={quotation.ssdImage} alt="ssd_image" />
              </div>
              <div className="quotation_info">
                <div className="parts_name">{quotation.ssdName}</div>
                <div className="parts_price">가격 : {quotation.ssdPrice} 원</div>
              </div>
            </div>

            <div className="quotation_info_container">
              <div className="quotation_img">
                <img src={quotation.hddImage} alt="hdd_image" />
              </div>
              <div className="quotation_info">
                <div className="parts_name">{quotation.hddName}</div>
                <div className="parts_price">가격 : {quotation.hddPrice} 원</div>
              </div>
            </div>
            <div className="quotation_info_container">
              <div className="quotation_img">
                <img src={quotation.coolerImage} alt="cooler_image" />
              </div>
              <div className="quotation_info">
                <div className="parts_name">{quotation.coolerName}</div>
                <div className="parts_price">
                  가격 : {quotation.coolerPrice} 원
                </div>
              </div>
            </div>
            <div className="quotation_info_container">
              <div className="quotation_img">
                <img src={quotation.powerImage} alt="power_image" />
              </div>
              <div className="quotation_info">
                <div className="parts_name">{quotation.powerName}</div>
                <div className="parts_price">가격 : {quotation.powerPrice} 원</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer">
        <div className="total_price">Total: {quotation.totalPrice} 원</div>
        <div className="buttons">
          <button onClick={quotationUpdatebutton}>수정하기</button>
          <button onClick={() => navigate(-1)}>돌아가기</button>
          <button onClick={quotationDeleteHandler}>삭제하기</button>
        </div>
      </div>
    </div>
  );
}
