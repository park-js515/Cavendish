import { deleteQuotation, getQuotationDetail } from "api/quotation";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "../../../node_modules/react-router-dom/dist/index";

export default function QuotationDetailComponent() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getQuotationDetail(
      id,
      (response) => {
        const data = response.data;
        console.log(data);
      },
      () => {},
    );
  }, []);

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
    <div>
      <div>
        <div className="title">title</div>
        <div className="content">content</div>

        <button onClick={navigate(-1)}>돌아가기</button>
        <button onClick={quotationDeleteHandler}>삭제</button>
      </div>
    </div>
  );
}
