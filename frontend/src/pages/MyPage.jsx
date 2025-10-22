import "../style/MyPage.css";
import Header from "../components/Header";
import MyInfo from "../components/MyInfo";
import MyPost from "../components/MyPost";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
const MyPage = () => {
  const nav = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const { api, logout } = useAuth();
  useEffect(() => {
      const fetchMe = async () => {
          try {
            const response = await api.get("/api/user/me");
            setUserInfo({
                id : response.data.loginId,
                hp : response.data.hp
            });
          } catch (error) {
            console.error("Failed to fetch me:", error);
          }
        };
        fetchMe();
  }, []);

  const onUpdate = async (pw, hp) => {
      try {
          const response = await api.patch("/api/user/me", {
              pw: pw,
              hp: hp
          });
          setUserInfo((prevUserInfo)=> ({...prevUserInfo, pw:pw, hp:hp}));
      } catch (error) {
          console.error("Failed to update user:", error);
          throw error;
      }
  };
  const onDelete = async () => {
    if (confirm("탈퇴 시 모든 정보가 삭제됩니다. 정말 탈퇴하시겠습니까?")) {
        try {
            await api.delete("/api/user/me");
            onLogOut();
          } catch (error) {
            console.error("Failed to delete user:", error);
            alert("삭제에 실패했습니다.");
          }
    }
  };

  const onLogOut = () => {
    logout();
    nav("/");
  };

  return (
    <div className="MyPage">
      <Header rightChild={"child"} />
      <div className="MyPage-container inner">
        <div className="MyInfo-container">
          <MyInfo
            userInfo={userInfo}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onLogOut={onLogOut}
          />
        </div>
        <MyPost/>
      </div>
    </div>
  );
};
export default MyPage;
