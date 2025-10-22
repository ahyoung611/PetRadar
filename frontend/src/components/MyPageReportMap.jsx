import { useEffect, useRef } from "react";

const AppKey = "b737c6777956f74337fc9bc5a08e3b55";

const MyPageReportMap = ({ petReportPoint }) => {
  const mapRef = useRef(null);
  const staticMapRef = useRef(null);

  const initializeStaticMap = () => {
    if (mapRef.current) {
      mapRef.current.innerHTML = "";
    }
    const center = new window.kakao.maps.LatLng(
      petReportPoint.lat,
      petReportPoint.lng
    );
    const marker = { position: center };
    const options = {
      center,
      level: 3,
      marker,
    };
    staticMapRef.current = new window.kakao.maps.StaticMap(
      mapRef.current,
      options
    );
  };

  useEffect(() => {
    if (!petReportPoint) return;
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${AppKey}&libraries=services&autoload=false`;
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          initializeStaticMap();
        });
      };
      document.head.appendChild(script);
    } else {
      initializeStaticMap();
    }
  }, [petReportPoint]);
  return <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>;
};
export default MyPageReportMap;
