import { Link, useNavigate } from "react-router-dom";
import "../style/Login.css";
import LoginForm from "../components/LoginForm";
import { useEffect } from "react";
import { useAuth } from '../contexts/AuthContext';
const Login = () => {
  const nav = useNavigate();
  const { login, api } = useAuth();
  /*
  useEffect(() => {
    if (userState.currentUser) {
      nav("/", { replace: true });
    }
  }, [userState.currentUser, nav]);
  */
  const isExist = async (id) => {
      try {
        const response = await api.get("/api/auth/check-exist", { params : {id} });
        return response.data;
      } catch (error) {
        console.error("isExist : ", error);
        return false;
      }
    };
  const onLogin = async (id, pw) => {
    try {
      const response = await api.post("/api/auth/login", {
        id,
        pw,
      });
      if (response.status === 200) {
        login(response.data.accessToken);
        nav("/", { replace: true });
        return true;
      }
    } catch (error) {
        alert("로그인 중 오류가 발생했습니다.");
        console.error("Login error:", error);
        return false;
    }
  };

  return (
    <>
      <div className="Login">
        <div className="Login-container">
          <div className="logo">
            <Link to="/">
              <img className="logo" src="/PetRadar-Logo-m.png" />
            </Link>
          </div>
          <div className="Login-contents">
            <LoginForm
              isExist={isExist}
              onLogin={onLogin}
            />
            <div className="register-btn">
              <Link className="register" to="/register">
                회원가입 →
              </Link>
            </div>
            <div className="login-img">
              <img src="/Menu-icon1.png" alt="login-img" />
            </div>
          </div>
        </div>
        <div className="bg-icons">
          <img className="bg-icon bg-icon1" src="/bg-icon.png" alt="bg-icon1" />
          <img className="bg-icon bg-icon2" src="/bg-icon.png" alt="bg-icon1" />
          <img className="bg-icon bg-icon3" src="/bg-icon.png" alt="bg-icon1" />
        </div>
      </div>
    </>
  );
};
export default Login;
