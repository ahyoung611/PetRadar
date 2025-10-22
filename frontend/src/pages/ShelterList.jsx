import ShelterInfo from "../components/ShelterInfo";

import "../style/ShelterList.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useModal } from "../hooks/ModalContext";
import ShelterModalDetail from "../components/ShelterModalDetail";

import Map from "../components/Map";
import useShelterData from "../api/ShelterData";
import Header from "../components/Header";

const ShelterList = () => {
  const { animals, error } = useShelterData();
  const [dots, setDots] = useState("");
  const mapRef = useRef(null);
  const loadingRef = useRef(null);

  const navigate = useNavigate();
  const { isActive, toggleModal } = useModal();
  const [selectedShelter, setSelectedShelter] = useState(null);

  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const ShelterInfoClick = (shelter) => {
    setSelectedAnimal(shelter);
    toggleModal();
  };

  const uniqueShelters = animals
    .filter((shelter, index, self) => {
      const key = `${shelter.SHTER_NM}-${
        shelter.REFINE_ROADNM_ADDR || shelter.REFINE_LOTNO_ADDR
      }`;
      return (
        index ===
        self.findIndex(
          (s) =>
            `${s.SHTER_NM}-${s.REFINE_ROADNM_ADDR || s.REFINE_LOTNO_ADDR}` ===
            key
        )
      );
    })
    .slice(0, 5); // 상위 5개만 유지

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (loadingRef.current) {
        const dots = ".".repeat(count % 4); // "", ".", "..", "..."
        loadingRef.current.textContent = `로딩중${dots}`;
        count++;
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);
  const handleItemClick = (shelter) => {
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
        <span ref={loadingRef} className="load">
          로딩중
        </span>
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
          <Map
            shelters={uniqueShelters}
            onSelect={(shelter) => {
              if (mapRef.current) mapRef.current(shelter);
              setSelectedShelter(shelter);
              toggleModal();
            }}
            setCenterRef={mapRef}
          />
          {isActive && selectedShelter && (
            <ShelterInfo shelter={selectedShelter} onClose={toggleModal} />
          )}
        </div>

        <div className="ShelterList-contents">
          {uniqueShelters.map((shelter, index) => (
            <div
              key={index}
              className="shelter-card"
              onClick={() => ShelterInfoClick(shelter)}
            >
              <img
                src={"/image-default.png"}
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
                  e.stopPropagation(); //버튼 클릭 시 모달도 같이 열리는 걸 방지
                  handleItemClick(shelter);
                }}
              >
                <p>보호동물 보기 →</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isActive && (
        <ShelterModalDetail
          animal={selectedAnimal}
          onClose={() => {
            toggleModal(); // 모달 닫기
            setSelectedAnimal(null); // 상태 초기화
          }}
        />
      )}
    </div>
  );
};

export default ShelterList;
