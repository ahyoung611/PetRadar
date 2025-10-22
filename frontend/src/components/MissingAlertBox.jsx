import "../style/AlertBox.css";
const MissingAlertBox = ({
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
        <div className="alert-icon">🚨</div>
        <div className="alert-message">
          <h3>{senderId}님이 당신 근처에서 실종 신고를 했어요.</h3>
          <p>빠른 관심과 도움이 필요합니다.</p>
        </div>
      </div>
      <div className="alert-close" onClick={onAlertClose}>
        ✕
      </div>
    </div>
  );
};
export default MissingAlertBox;
