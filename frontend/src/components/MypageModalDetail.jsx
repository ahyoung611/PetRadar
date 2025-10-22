import "../style/MypageModalDetail.css";
import { useModal } from "../hooks/ModalContext";

import { getMissingImage } from "../utils/get-missingPet-image"; // 수정필요
import { missingPet } from "../utils/missingPet"; // 수정필요

import Button from "./Button";
import MyPageReportMap from "./MyPageReportMap";

const MypageModalDetail = ({
  title,
  content,
  petReportPoint,
  petReportPlace,
}) => {
  const { isActive, toggleModal } = useModal();

  return (
    <div className={`MypageModalDetail ${isActive ? "active" : ""}`}>
      <div className="Modal-container">
        <div className="Modal-contents">
          <div className="Map-box">
            <MyPageReportMap petReportPoint={petReportPoint} />
          </div>
          <div className="text-contents">
            <div className="contents-t1">
              <p className="petType">{title}</p>
            </div>
            <div className="contents-t2">
              <p>{content}</p>
            </div>
          </div>
        </div>
        <div className="Modal-btn" onClick={toggleModal}>
          <Button text={"X"} type={"Circle"} />
        </div>
      </div>
    </div>
  );
};
export default MypageModalDetail;
