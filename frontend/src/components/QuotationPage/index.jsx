import { getQuotationList } from "api/quotation";
import { useEffect, useState } from "react";

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
      <div className="quotation_header">견적서</div>
      {quotationList.map((quotation) => {
        return (
          <div className="quotation_container" key={quotation.quotationId}>
            <div className="quotation_name">{quotation.name}</div>
          </div>
        );
      })}
    </div>
  );
}
