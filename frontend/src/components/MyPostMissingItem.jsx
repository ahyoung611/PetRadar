import "../style/MyPostMissingItem.css";
const MyPostMissingItem = ({ isActive, petName, onClick }) => {
  return (
    <button
      className={`MyPostMissingItem ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {petName}
    </button>
  );
};
export default MyPostMissingItem;
