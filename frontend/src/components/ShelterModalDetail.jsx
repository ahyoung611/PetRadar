import Button from "../components/Button";
import "../style/ModalDetail.css";

const ShelterModalDetail = ({ animal, onClose }) => {
  if (!animal) return null;

  return (
    <div className="ModalDetail active" onClick={onClose}>
      <div className="Modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="Modal-contents">
          <div className="img-box" style={{ height: "200px" }}>
            <img
              src={"/image-default.png"}
              alt="동물 이미지"
              onError={(e) => {
                e.target.src = "/image-default.png";
              }}
              style={{
                objectFit: "cover",
                height: "100%",
                width: "100%",
                borderRadius: "10px",
              }}
            />
          </div>

          <div className="text-contents">
            <div className="contents-t1">
              <h3>{animal.SHTER_NM}</h3>
            </div>
            <div>
              <h3>주소</h3>
              <p>{animal.PROTECT_PLC}</p>
            </div>
            <div>
              <h3>전화번호</h3>
              <p>{animal.SHTER_TELNO}</p>
            </div>
          </div>
        </div>

        <div className="Modal-btn" onClick={onClose}>
          <Button text={"X"} type={"Circle"} />
        </div>
      </div>
    </div>
  );
};

export default ShelterModalDetail;
