import { useState, useEffect, forwardRef, useRef } from "react";

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
    <div className="modal-outer" onDoubleClick={onDoubleClick}>
      {children}
    </div>
  );
};

const ModalContent = forwardRef(({ children, isOpen }, ref) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-inner" ref={ref}>
      {children}
    </div>
  );
});

const Item = ({ id, name, price, image }) => {
  return <div></div>;
};

const Modal = ({ item, isOpen, handleIsOpen }) => {
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
    <ModalOverlay isOpen={isOpen} onDoubleClick={onDoubleClick}>
      <ModalContent ref={modalRef} isOpen={isOpen}></ModalContent>
    </ModalOverlay>
  );
};

export { useModal, Modal };
