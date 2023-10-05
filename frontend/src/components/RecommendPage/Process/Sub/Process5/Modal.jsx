import { useState, useEffect, forwardRef, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// redux
import { useSelector } from "react-redux";

// defaultImgs3
import crossImg from "assets/defaultImgs3/cross-black.png";

// API
import { createQuotation } from "api/quotation";

const addComma = (num) => {
  const st = num.toString();

  return st.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen((current) => !current);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return { isOpen, handleIsOpen };
};

const ModalOverlay = ({ children, isOpen, onDoubleClick }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      onDoubleClick={onDoubleClick}
      style={{
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.125)",
        zIndex: 0,
      }}
    >
      {children}
    </div>
  );
};

const ModalContent = forwardRef(({ children, isOpen }, ref) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={ref}
      style={{
        boxSizing: "border-box",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "2.5px",
        height: "70%",
        width: "60%",
        borderRadius: "5px",
      }}
    >
      {children}
    </div>
  );
});

const Item = ({ id, name, price, image }) => {
  return (
    <div
      style={{
        height: "10%",
        width: "100%",
        boxSizing: "border-box",
        margin: "2.5px 5%",
        display: "flex",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "20%",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(${image})`,
        }}
      ></div>
      <div
        style={{
          height: "100%",
          width: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "0.8rem",
        }}
      >
        {name}
      </div>
      <div
        style={{
          height: "100%",
          width: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {`${addComma(price)}원 ~`}
      </div>
    </div>
  );
};

const Btns = ({ nowItem }) => {
  const navigate = useNavigate();
  const processList0 = useSelector((state) => {
    return state.recommend.processList[0];
  });
  const isLogin = useSelector((state) => {
    return state.user.isLogin;
  });

  const fn1 = (val) => {
    const name = val;
    const cpuId = nowItem.cpu?.id;
    const hasCpu = processList0[2].is_have;
    const powerId = nowItem.power?.id;
    const hasPower = processList0[6].is_have;
    const mainboardId = nowItem.mainboard?.id;
    const hasMainboard = processList0[5].is_have;
    const ramId = nowItem.ram?.id;
    const hasRam = processList0[7].is_have;
    const gpuId = nowItem.gpu?.id;
    const hasGpu = processList0[3].is_have;
    const hddId = nowItem.hdd?.id;
    const hasHdd = processList0[4].is_have;
    const ssdId = nowItem.ssd?.id;
    const hasSsd = processList0[8].is_have;
    const caseId = nowItem.case?.id;
    const hasCase = processList0[0].is_have;
    const coolerId = nowItem.cooler?.id;
    const hasCooler = processList0[1].is_have;

    const body = {
      name,
      cpuId,
      hasCpu,
      powerId,
      hasPower,
      mainboardId,
      hasMainboard,
      ramId,
      hasRam,
      gpuId,
      hasGpu,
      hddId,
      hasHdd,
      ssdId,
      hasSsd,
      caseId,
      hasCase,
      coolerId,
      hasCooler,
    };

    const success = (response) => {
      // console.log(response);
    };

    const fail = (error) => {
      console.error(error);
    };

    createQuotation({ ...body }, success, fail);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
        style={{
          height: "calc(100% - 102px)",
          fontSize: "1.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        <p>{`${addComma(nowItem.total)} 원 ~`}</p>
      </div>
      <div className="modal-btn-wrapper">
        {/* <div className="printBtn" onClick={() => {}}>{`출 력`}</div> */}
        <div
          className="saveBtn"
          onClick={() => {
            if (isLogin) {
              Swal.fire({
                title: "견적서 이름을 입력하세요",
                input: "text",
                inputAttributes: {
                  autocapitalize: "off",
                },
                showCancelButton: true,
                confirmButtonText: "제출",
                cancelButtonText: "취소",
              }).then((value) => {
                if (value.isConfirmed) {
                  console.log(value);
                  fn1(value.value);
                  Swal.fire({
                    icon: "success",
                    title: "알림",
                    text: "저장되었습니다.",
                  });
                }
              });
            } else {
              Swal.fire({
                title: "로그인",
                text: "로그인이 필요한 기능입니다",
                icon: "info",
              });
              navigate("/login");
            }
          }}
        >{`저 장`}</div>
      </div>
    </div>
  );
};

const Layout = ({ nowItem, handleIsOpen }) => {
  const keys = Object.keys(nowItem);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div style={{ height: "10%", width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
          }}
        >
          <div></div>
          <div
            className="cross"
            style={{
              height: "100%",
              aspectRatio: "1/1",
              backgroundSize: "60%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: `url(${crossImg})`,
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handleIsOpen}
          ></div>
        </div>
      </div>
      <div style={{ display: "flex", height: "90%", width: "100%" }}>
        <div style={{ height: "100%", width: "70%" }}>
          {keys.map((key, index) => {
            const { id, name, price, image } = nowItem[key];
            const props = { id, name, price, image };

            if (key !== "total") {
              return <Item key={index} {...props} />;
            }

            return <div key={index}></div>;
          })}
        </div>
        <div style={{ height: "100%", width: "30%" }}>
          <Btns nowItem={nowItem} />
        </div>
      </div>
    </div>
  );
};

const Modal = ({ nowItem, isOpen, handleIsOpen }) => {
  const modalRef = useRef(null);

  const onDoubleClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleIsOpen();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleESC = (event) => {
      if (event.key === "Escape") {
        handleIsOpen();
      }
    };

    document.addEventListener("keydown", handleESC);

    return () => {
      document.removeEventListener("keydown", handleESC);
    };
  }, [isOpen, handleIsOpen]);

  return (
    <div>
      <ModalOverlay isOpen={isOpen} onDoubleClick={onDoubleClick}>
        <ModalContent ref={modalRef} isOpen={isOpen}>
          <Layout nowItem={nowItem} handleIsOpen={handleIsOpen} />
        </ModalContent>
      </ModalOverlay>
    </div>
  );
};

export { useModal, Modal };
