import "../style/SideBar.css";
import Button from "./Button";
import ReportAlertBox from "./ReportAlertBox";
import MissingAlertBox from "./MissingAlertBox";
import { useSidebar } from "../hooks/SidebarContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

const SideBar = () => {
  const nav = useNavigate();
  const { api } = useAuth();
  const { isActive, toggleSidebar, alerts, setAlerts } = useSidebar();

  const onAlertClose = async (id) => {
    try {
      await api.delete(`/api/notification/${id}`);
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  return (
    <div className={`SideBar ${isActive ? "active" : ""}`}>
      <div className="close-btn" onClick={toggleSidebar}>
        <Button text={"X"} type={"Circle"} />
      </div>
      {alerts.map((alert) =>
          alert.postType === "missing" ? (
            <MissingAlertBox
              key={`${alert.postType}_${alert.id}`}
              {...alert}
              onAlertClick={() => nav("/missingList")}
              onAlertClose={() => onAlertClose(alert.id)}
            />
          ) : (
            <ReportAlertBox
              key={`${alert.postType}_${alert.id}`}
              {...alert}
              currentUser={alert.receiverId}
              onAlertClick={() => nav("/myPage")}
              onAlertClose={() => onAlertClose(alert.id)}
            />
          )
        )}
    </div>
  );
};
export default SideBar;
