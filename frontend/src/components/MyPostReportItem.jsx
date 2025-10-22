import "../style/MyPostReportItem.css";
const MyPostReportItem = ({ title, content, petImage, onClick }) => {
  return (
    <div onClick={onClick} className="MyPostReportItem">
      <div className="thumbnail">
        <img src={petImage || "/image-default.png"} />
      </div>
      <div className="info">
        <p className="title">{title}</p>
        <p className="description">{content}</p>
        <p className="location">상세보기 →</p>
      </div>
    </div>
  );
};
export default MyPostReportItem;
