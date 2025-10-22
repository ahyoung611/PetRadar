import '../style/Register.css';
import RegisterForm from '../components/RegisterForm';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
const Register = () => {
  const nav = useNavigate();
  const { api } = useAuth();
  /*
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  useEffect(() => {
    if (userState.currentUser) {
      nav('/', { replace: true });
    }
  }, [userState.currentUser, nav]);
  */

  const isExist = async (id) => {
    try {
      const response = await api.get("/api/auth/check-exist", { params : {id} });
      return response.data;
    } catch (error) {
      console.error("isExist : ", error);
      return true;
    }
  };

  const onRegister = async (id, pw, hp) => {
    try {
      await api.post("/api/auth/register", { id, pw, hp });
      nav("/login", { replace: true });
    } catch (error) {
        console.error("onRegister : ", error);
    }
  };

  return (
    <div className="Register">
      <div className="Register-container">
        <div className="logo">
          <Link to="/">
            <img className="logo" src="/PetRadar-Logo-m.png" />
          </Link>
        </div>
        <div className="Register-contents">
          <RegisterForm isExist={isExist} onRegister={onRegister} />
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
  );
};
export default Register;
