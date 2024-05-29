import React, { useRef } from "react";
import ModalWrapper from "./ModalWrapper";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "qrcode.react";

const QrCodesModal = ({
  open,
  setOpen,
  StationNo,
  FuelType,
  CurrentDispenser,
}) => {
  const pdfRef = useRef();

  const downloadPdf = (e) => {
    alert("clicked");
    const input = pdfRef.current;
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4", true);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 5;
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        );
        pdf.save("qr-codes.pdf");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <div ref={pdfRef}>
        <div className="flex justify-center items-center font-bold text-3xl border-b-black border-b-[3px] text-black py-5">
          {`Station Number: ${StationNo} -  Fuel Type: ${FuelType}`}
        </div>
        <div className="flex flex-col px-5 pt-5 w-[750px] h-fit overflow-scroll">
          <div className="rounded-lg flex gap-x-4 flex-wrap justify-center items-center gap-y-4 py-4">
            {CurrentDispenser.map((cd) => {
              return <QRCode value={cd} renderAs="canvas" />;
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full items-center py-5">
        <button
          className={`mt-[5px] mb-[10px] w-[197px] max767:w-[100px] h-fit py-2 bg-[#90898E] hover:bg-[#465462] rounded-[40px] text-white text-[1.2rem] font-[700] transition-all duration-500 ease-in-out`}
          onClick={downloadPdf}
        >
          Download
        </button>
      </div>
    </ModalWrapper>
  );
};

export default QrCodesModal;
