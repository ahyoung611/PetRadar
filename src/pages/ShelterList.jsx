import React, { useEffect, useRef, useState } from "react";
import "../style/ShelterList.css";
import { useNavigate } from "react-router-dom";
import Map from "../components/Map";
import useShelterData from "../api/ShelterData";
import Header from "../components/Header";
import ShelterDetail from "../components/ShelterDetail"; // 새로 추가

const ShelterList = () => {
  const { animals, error } = useShelterData();
  const [dots, setDots] = useState("");
  const [selectedShelter, setSelectedShelter] = useState(null); // 모달용 상태
  const mapCenterRef = useRef(null);
  const navigate = useNavigate();

  const uniqueShelters = animals.filter((shelter, index, self) => {
    const key = `${shelter.SHTER_NM}-${
      shelter.REFINE_ROADNM_ADDR || shelter.REFINE_LOTNO_ADDR
    }`;
    return (
      index ===
      self.findIndex(
        (s) =>
          `${s.SHTER_NM}-${s.REFINE_ROADNM_ADDR || s.REFINE_LOTNO_ADDR}` === key
      )
    );
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (shelter) => {
    setSelectedShelter(shelter); // 모달 오픈
  };

  const handleAnimalBtnClick = (shelter) => {
    const name = encodeURIComponent(shelter.SHTER_NM);
    const addr = encodeURIComponent(
      shelter.REFINE_ROADNM_ADDR || shelter.REFINE_LOTNO_ADDR
    );
    navigate(`/shelter/${name}/${addr}`);
  };

  if (error) return <div>에러 발생</div>;
  if (!Array.isArray(animals)) return <div>불러오는 중...</div>;
  if (!animals.length)
    return (
      <div className="load-wrapper">
        <div className="img-box">
          <img src="/Menu-icon1.png" alt="dog-img" />
        </div>
        <span className="load">로딩중{dots}</span>
      </div>
    );

  return (
    <div className="ShelterList">
      <Header leftChild={true} />
      <div className="ShelterList-container inner">
        <div className="PageTitle">
          <h3>보호소 정보</h3>
        </div>

        <div className="Map-wrapper">
          <Map shelters={uniqueShelters} setCenterRef={mapCenterRef} />
        </div>

        <div className="ShelterList-contents">
          {uniqueShelters.map((shelter, idx) => (
            <div
              key={idx}
              className="shelter-card"
              onClick={() => handleCardClick(shelter)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={shelter.THUMB_IMAGE_COURS || "/image-default.png"}
                alt="썸네일"
                className="shelter-thumb"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/image-default.png";
                }}
              />
              <div className="shelter-info">
                <strong>{shelter.SHTER_NM}</strong>
                <p>{shelter.REFINE_ROADNM_ADDR || shelter.REFINE_LOTNO_ADDR}</p>
              </div>
              <div
                className="ShelterAnimalList-btn"
                onClick={(e) => {
                  e.stopPropagation(); // 부모 div 클릭 막기
                  handleAnimalBtnClick(shelter);
                }}
              >
                <p>보호동물 보기 →</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 모달: ShelterDetail */}
      <ShelterDetail
        shelter={selectedShelter}
        onClose={() => setSelectedShelter(null)}
      />
    </div>
  );
};

export default ShelterList;
