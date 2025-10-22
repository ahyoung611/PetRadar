import "../style/MissingItem.css";
import { getMissingImage } from "../utils/get-missingPet-image";
import Button from "./Button";

const MissingItem = ({ missingDTO, onClick, toggleModal, myMissing }) => {
  const imageSrc = missingDTO.petImage || "/image-default.png";

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
    <div className="MissingItem">
      <div className="MissingItem-img" onClick={toggleModal}>
        <img
          src={imageSrc}
          alt="missingPet img"
          onError={(e) => {
            e.target.onerror = null;
          }}
        />
      </div>
      <div className="contents" onClick={toggleModal}>
        <div className="contents-t1">
          <p className="petType">{petTypeChange[missingDTO.petType] || "-"}</p>
          <p>{genderSymbol[missingDTO.petGender] || "-"}</p>
          <p>{missingDTO.petName}</p>
        </div>
        <p className="contents-t2">{missingDTO.title}</p>
        <p>{missingDTO.petAge}(년생)</p>
        <p>실종일자 : {missingDTO.petMissingDate}</p>
      </div>
      <div className="ReportMove-btn">
        {!myMissing && (
          <Button text={"제보하기"} type={"Square_ls"} onClick={onClick} />
        )}
      </div>
    </div>
  );
};
export default MissingItem;
