import { useState, useEffect } from "react";
import "./addModal.css";

const AdModal = ({ show, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(10); 

  useEffect(() => {
    if (show) {
      setTimeLeft(10); // reiniciar el contador cuando se abre el modal
    }
  }, [show]);

  useEffect(() => {
    if (!show) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="ad-modal-overlay">
      <div className="ad-modal">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz8MpFFjFiwgH5pIk3_HiB9b-OLUL6uBQlYw&s" 
          alt="ad" 
        />
        <div>Please wait {timeLeft} second(s)</div>
      </div>
    </div>
  );
};

export default AdModal;