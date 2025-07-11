import "../style/MissingItem.css";
import { getMissingImage } from "../utils/get-missingPet-image";
import { useMissingState } from "../contexts/MissingContext";
import Button from "./Button";

const MissingItem = ({ petMissingId, onClick, toggleModal, myMissing }) => {
  const missingList = useMissingState();

  const missingPet = missingList.find(
    (item) => String(item.petMissingId) === String(petMissingId)
  );

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
          <p className="petType">{petTypeChange[missingPet.petType] || "-"}</p>
          <p>{genderSymbol[missingPet.petGender] || "-"}</p>
          <p>{missingPet.petName}</p>
        </div>
        <p className="contents-t2">{missingPet.title}</p>
        <p>{missingPet.petAge}(년생)</p>
        <p>실종일자 : {missingPet.petMissingDate}</p>
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
