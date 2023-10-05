import { deleteQuotation, getQuotationDetail } from "api/quotation";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function QuotationDetailComponent() {
  const { id } = useParams();

  const [quotation, setQuotation] = useState("");

  const [cpuData, setCpuData] = useState({});
  const [gpuData, setGpuData] = useState({});
  const [ssdData, setSsdData] = useState({});
  const [ramData, setRamData] = useState({});
  const [hddData, setHddData] = useState({});
  const [mainboardData, setMainboardData] = useState({});
  const [powerData, setPowerData] = useState({});
  const [coolerData, setCoolerData] = useState({});
  const [caseData, setCaseData] = useState({});

  const partsData = [
    cpuData,
    gpuData,
    ramData,
    ssdData,
    hddData,
    mainboardData,
    powerData,
    coolerData,
    caseData,
  ];

  const navigate = useNavigate();

  const setData = () => {
    if ("cpuId" in quotation) {
      setCpuData({
        cate: "cpu",
        id: quotation.cpuId,
        image: quotation.cpuImage,
        name: quotation.cpuName,
        price: quotation.cpuPrice,
      });
    }
    if ("gpuId" in quotation) {
      setGpuData({
        cate: "gpu",
        id: quotation.gpuId,
        image: quotation.gpuImage,
        name: quotation.gpuName,
        price: quotation.gpuPrice,
      });
    }
    if ("ssdId" in quotation) {
      setSsdData({
        cate: "ssd",
        id: quotation.ssdId,
        image: quotation.ssdImage,
        name: quotation.ssdName,
        price: quotation.ssdPrice,
      });
    }
    if ("ramId" in quotation) {
      setRamData({
        cate: "ram",
        id: quotation.ramId,
        image: quotation.ramImage,
        name: quotation.ramName,
        price: quotation.ramPrice,
      });
    }
    if ("hddId" in quotation) {
      setHddData({
        cate: "hdd",
        id: quotation.hddId,
        image: quotation.hddImage,
        name: quotation.hddName,
        price: quotation.hddPrice,
      });
    }
    if ("mainboardId" in quotation) {
      setMainboardData({
        cate: "mainboard",
        id: quotation.mainboardId,
        image: quotation.mainboardImage,
        name: quotation.mainboardName,
        price: quotation.mainboardPrice,
      });
    }
    if ("powerId" in quotation) {
      setPowerData({
        cate: "power",
        id: quotation.powerId,
        image: quotation.powerImage,
        name: quotation.powerName,
        price: quotation.powerPrice,
      });
    }
    if ("coolerId" in quotation) {
      setCoolerData({
        cate: "cooler",
        id: quotation.coolerId,
        image: quotation.coolerImage,
        name: quotation.coolerName,
        price: quotation.coolerPrice,
      });
    }
    if ("caseId" in quotation) {
      setCaseData({
        cate: "case",
        id: quotation.caseId,
        image: quotation.caseImage,
        name: quotation.caseName,
        price: quotation.casePrice,
      });
    }
  };

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
  }, [id]);

  useEffect(() => {
    if (quotation) {
      setData();
    }
  }, [quotation]);

  const quotationUpdatebutton = () => {
    navigate(`/quotation/update/${id}`);
  };

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
          {partsData.map((data, idx) => {
            if (data.id !== null && data.id !== undefined) {
              return (
                <div className="quotation_info_container" key={idx}>
                  <div className="quotation_img">
                    <img src={data.image} alt={data.name} />
                  </div>
                  <div className="quotation_info">
                    <div className="parts_name">{data.name}</div>
                    <div className="parts_price">가격 : {data.price} 원</div>
                  </div>
                </div>
              );
            } else return null;
          })}
        </div>
      </div>

      <div className="footer">
        <div className="total_price">Total: {quotation.totalPrice} 원</div>
        <div className="buttons">
          <button onClick={() => navigate(-1)}>돌아가기</button>
          <button onClick={quotationDeleteHandler}>삭제하기</button>
        </div>
      </div>
    </div>
  );
}
