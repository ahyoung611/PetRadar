import "../style/ModalDetail.css";
import { useModal } from "../hooks/ModalContext";
import Button from "./Button";

const ModalDetail = ({ missingPet, onClick, myMissing }) => {
  const { isActive, toggleModal } = useModal();

  const imageSrc = missingPet.petImage || "/image-default.png";

  const genderSymbol = {
    M: "♂",
    F: "♀",
  };
  const petTypeChange = {
    dog: "강아지",
    cat: "고양이",
    etc: "기타 동물",
  };

  return (
    <div className={`ModalDetail ${isActive ? "active" : ""}`}>
      <div className="Modal-container">
        <div className={`Modal-contents${!myMissing ? "-pet" : ""}`}>
          <div className="img-box">
            <img src={imageSrc} alt="missingPet img" />
          </div>
          <div className="text-contents">
            <div className="contents-t1">
              <h3 className="petType">
                {petTypeChange[missingPet.petType] || "-"}
              </h3>
              <h3>{genderSymbol[missingPet.petGender] || "-"}</h3>
              <h3>{missingPet.petName}</h3>
            </div>
            <div>
              <h3>나이</h3>
              <p>{missingPet.petAge}(년생)</p>
            </div>
            <div>
              <h3>실종날짜 </h3>
              <p>{missingPet.petMissingDate}</p>
            </div>
            <div className="contents-t4">
              <h3>제목</h3>
              <p>{missingPet.title}</p>
            </div>
            <div className="contents-t4">
              <h3>내용</h3>
              <p>{missingPet.content}</p>
            </div>
          </div>
          <div className="Report-btn">
            {!myMissing && (
              <Button text={"제보하기"} type={"Square_D"} onClick={onClick} />
            )}
          </div>
        </div>
        <div className="Modal-btn" onClick={toggleModal}>
          <Button text={"X"} type={"Circle"} />
        </div>
      </div>
    </div>
  );
};
export default ModalDetail;
