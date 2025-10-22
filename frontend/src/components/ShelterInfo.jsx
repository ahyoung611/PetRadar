import '../style/ModalDetail.css';
import '../style/ShelterInfo.css';
import Button from '../components/Button';

const ShelterInfo = ({ shelter, onClose }) => {
  if (!shelter) return null;

  return (
    <div className="ModalDetail active" onClick={onClose}>
      <div className="Modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="Modal-contents">
          <div className="text-contents">
            <div className="ShelterInfoIMG">
              <img src="/image-default.png" />
            </div>
            <div className="contents-t1">
              <h3>{shelter.SHTER_NM}</h3>
            </div>
            <div>
              <h3>주소</h3>
              <p>{shelter.REFINE_ROADNM_ADDR || shelter.REFINE_LOTNO_ADDR}</p>
            </div>
            <div>
              <h3>전화번호</h3>
              <p>{shelter.SHTER_TELNO || '없음'}</p>
            </div>
          </div>
        </div>

        <div className="Modal-btn" onClick={onClose}>
          <Button text="X" type="Circle" />
        </div>
      </div>
    </div>
  );
};

export default ShelterInfo;
