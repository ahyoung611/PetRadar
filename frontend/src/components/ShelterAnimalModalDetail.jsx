import Button from '../components/Button';
import '../style/ModalDetail.css';

const ShelterModalDetail = ({ animal, onClose }) => {
  if (!animal) return null;

  return (
    <div className="ModalDetail active" onClick={onClose}>
      <div className="Modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="Modal-contents">
          <div className="img-box">
            <img
              src={animal.IMAGE_COURS || '/image-default.png'}
              alt="동물 이미지"
              onError={(e) => {
                e.target.src = '/image-default.png';
              }}

            />
          </div>

          <div className="text-contents">
            <div className="contents-t1">
              <p className="petType">{animal.SPECIES_NM}</p>
            </div>
            <div>
              <h3>색상</h3>
              <p>{animal.COLOR_NM}</p>
            </div>
            <div>
              <h3>나이</h3>
              <p>{animal.AGE_INFO}</p>
            </div>
            <div>
              <h3>특이사항</h3>
              <p>{animal.SFETR_INFO || '없음'}</p>
            </div>
            <div>
              <h3>보호소 위치</h3>
              <p>{animal.PROTECT_PLC}</p>
            </div>
            <div>
              <h3>보호소 전화번호</h3>
              <p>{animal.SHTER_TELNO}</p>
            </div>
          </div>
        </div>

        <div className="Modal-btn" onClick={onClose}>
          <Button text={'X'} type={'Circle'} />
        </div>
      </div>
    </div>
  );
};

export default ShelterModalDetail;
