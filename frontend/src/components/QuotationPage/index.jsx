import { getQuotationList } from "api/quotation";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function QuotationPageComponent() {
  const [quotationList, setQuotationList] = useState([]);

  useEffect(() => {
    getQuotationList(
      { page: 0, size: 10 },
      (response) => {
        const data = response.data.response;
        setQuotationList(data.content);
        console.log(data);
      },
      () => {},
    );
  }, []);

  return (
    <div className="quotation_page">
      <div className="quotation_header">
        <div className="title">견적서</div>
        {/* <Link type="button" className="create_button" to="/quotation/create">
          {" "}
          생성하기
        </Link> */}
      </div>
      {quotationList.map((quotation) => {
        return (
          <Link
            className="quotation_container"
            key={quotation.quotationId}
            to={`/quotation/detail/${quotation.quotationId}`}
          >
            <div className="quotation_img">
              <img src={`${quotation.image}`} alt="" />
            </div>
            <div className="quotation_info">
              <div className="quotation_id">ID : {quotation.quotationId}</div>
              <div className="quotation_name">{quotation.name}</div>
              <div className="quotation_price">
                가격 : {quotation.totalPrice} 원
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
