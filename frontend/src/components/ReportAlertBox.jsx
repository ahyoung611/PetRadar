import "../style/AlertBox.css";
const ReportAlertBox = ({
  currentUser,
  id,
  senderId,
  postId,
  postType,
  onAlertClick,
  onAlertClose,
}) => {
  return (
    <div className="AlertBox">
      <div className="AlertBox-container" onClick={onAlertClick}>
        <div className="alert-icon">🐾</div>
        <div className="alert-message">
          <h3>
            {currentUser}님의 실종 동물을 {senderId || "펫레이더 이웃"}님이 목격했다고
            제보가 왔어요!
          </h3>
          <p>지금 바로 확인해보세요. 작은 제보가 큰 단서가 될 수 있어요.</p>
        </div>
      </div>
      <div className="alert-close" onClick={onAlertClose}>
        ✕
      </div>
    </div>
  );
};
export default ReportAlertBox;
