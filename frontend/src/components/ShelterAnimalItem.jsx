import "../style/ShelterAnimalItem.css";

const ShelterAnimalItem = ({
  petId,
  petType,
  petAge,
  petColor,
  petMissingDate,
  imageUrl,
  onClick,
}) => {
  //실종일자 (-)추가
  const formatDate = (dateStr) => {
    if (!dateStr || dateStr.length !== 8) return dateStr;
    return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(
      6,
      8
    )}`;
  };

  return (
    <div className="ShelterAnimalItem" onClick={onClick}>
      <div className="ShelterAnimalItem-img">
        <img
          src={imageUrl || "/image-default.png"}
          alt="유기동물"
          onError={(e) => {
            e.target.src = "/image-default.png";
          }}
        />
      </div>
      <div className="contents">
        <div className="contents-t1">
          <p className="petType">{petType}</p>
        </div>
        <div>
          <p>색상 : {petColor}</p>
        </div>
        <div>
          <p>나이 : {petAge}</p>
        </div>
        <div>
          <p>입소일자 : {formatDate(petMissingDate)}</p>
        </div>
      </div>
    </div>
  );
};

export default ShelterAnimalItem;
