import { useEffect, useRef, useState } from "react";
import { useModal } from "../hooks/ModalContext";
import PetModalDetail from "../components/PetModalDetail";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import "../style/MissingMap.css";

const AppKey = "b737c6777956f74337fc9bc5a08e3b55";

const MissingMap = ({missingList}) => {
  const mapRef = useRef(null); // 카카오 지도 객체 참조
  const markerMapRef = useRef(new Map()); // 마커(오버레이) 객체 저장용
  const containerRef = useRef(null); // 지도 컨테이너 DOM 참조
  const nav = useNavigate();
  const { userId } = useAuth();
  const { isActive, toggleModal } = useModal(); // 모달 상태 및 토글 함수
  const [selectedPet, setSelectedPet] = useState(null); // 선택된 동물 정보
  const [mapLoaded, setMapLoaded] = useState(false); // 지도 로드 완료 여부

  useEffect(() => {
    // 카카오맵 스크립트 동적 로드
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${AppKey}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      // 스크립트 로드 후 카카오맵 초기화
      window.kakao.maps.load(() => {
        const map = new window.kakao.maps.Map(containerRef.current, {
          center: new window.kakao.maps.LatLng(
            37.374659507684,
            126.73570005568
          ), // 초기 중심 좌표(배곧)
          level: 3, // 초기 줌 레벨
        });
        mapRef.current = map; // 지도 객체 저장
        setMapLoaded(true); // 지도 로드 완료 상태 변경
      });
    };

    document.head.appendChild(script); // 스크립트 태그 추가
  }, []);

  useEffect(() => {
    // 지도와 카카오맵 객체가 준비되지 않았으면 종료
    if (!mapLoaded || !mapRef.current || !window.kakao?.maps) return;

    const map = mapRef.current;

    // 기존 마커(오버레이) 모두 제거
    for (let [id, marker] of markerMapRef.current) {
      marker.setMap(null);
    }
    markerMapRef.current.clear();

    // 실종 동물 리스트 순회하며 마커 생성
    missingList.forEach((pet) => {
      const { petMissingPoint, petImage } = pet;
      // 좌표 정보가 없으면 마커 생성하지 않음
      if (
        !petMissingPoint ||
        petMissingPoint.lat == null ||
        petMissingPoint.lng == null
      )
        return;

      const position = new window.kakao.maps.LatLng(
        petMissingPoint.lat,
        petMissingPoint.lng
      );

      // 최상위 래퍼
      const outerWrapper = document.createElement("div");
      outerWrapper.className = "custom-marker-outer-wrapper";

      // 중간 래퍼
      const wrapper = document.createElement("div");
      wrapper.className = "custom-marker-wrappers";

      // 이미지 래퍼
      const imgWrapper = document.createElement("div");
      imgWrapper.className = "custom-marker-img-wrapper";

      const img = document.createElement("img");
      img.className = "custom-marker-images";
      img.src = petImage || "/image-default.png";
      img.alt = "missing";

      imgWrapper.appendChild(img);
      wrapper.appendChild(imgWrapper);
      outerWrapper.appendChild(wrapper);

      // 마커 클릭 이벤트 등록
      wrapper.addEventListener("click", () => {
        if (mapRef.current) {
          // mapRef.current.setCenter(position); // 지도 중심 이동
          //mapRef.current.setLevel(5); // 줌 레벨 변경
        }

        setSelectedPet(pet); // 선택된 동물 정보 저장
        toggleModal();
      });

      // 커스텀 오버레이(마커) 생성
      const overlay = new window.kakao.maps.CustomOverlay({
        position,
        content: outerWrapper,
        yAnchor: 1,
      });

      overlay.setMap(map); // 지도에 오버레이 표시
      markerMapRef.current.set(pet.id, overlay); // 마커 맵에 저장
    });
  }, [mapLoaded, missingList, toggleModal]);

  return (
    <>
      {/* 카카오맵이 렌더링될 컨테이너 */}
      <div
        id="missingMap"
        ref={containerRef}
        style={{ width: "100%", height: "350px" }}
      ></div>
      {/* 모달이 활성화되고 동물이 선택된 경우 상세 모달 표시 */}
      {isActive && selectedPet && (
        <PetModalDetail
          missingPet={selectedPet}
          onClick={() => nav(`/missingReport/${selectedPet.id}`)}
          myMissing={userId === selectedPet.userId}
        />
      )}
    </>
  );
};

export default MissingMap;
