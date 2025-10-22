import '../style/MainMenu.css';

const MainMenu = ({ mainTitle, subTitle, imgLink, onclick }) => {
  return (
    <div className="MainMenu" onClick={onclick}>
      <h2>{mainTitle}</h2>
      <p>{subTitle}</p>
      <img src={imgLink} />
    </div>
  );
};
export default MainMenu;
