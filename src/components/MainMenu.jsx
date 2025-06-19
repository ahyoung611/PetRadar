import "../style/MainMenu.css";

const MainMenu = ({ mainTitle, subTitle, onclick }) => {
  return (
    <div className="MainMenu" onClick={onclick}>
      <h2>{mainTitle}</h2>
      <p>{subTitle}</p>
    </div>
  );
};
export default MainMenu;
