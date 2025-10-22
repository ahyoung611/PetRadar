import "../style/ShelterAnimalList.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useModal } from "../hooks/ModalContext";
import useShelterData from "../api/ShelterData";
import ShelterAnimalItem from "../components/ShelterAnimalItem";
import ShelterAnimalModalDetail from "../components/ShelterAnimalModalDetail";
import Header from "../components/Header";

const ShelterAnimalList = () => {
  const { animals } = useShelterData();
  const { name, addr } = useParams();

  const { isActive, toggleModal } = useModal();
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("newest"); // 최신순 기본

  const decodedName = decodeURIComponent(name);
  const decodedAddr = decodeURIComponent(addr);

  // 날짜 문자열 파싱 함수
  const parseDate = (str) => {
    if (!str || str.length !== 8) return new Date(0);
    const year = parseInt(str.slice(0, 4));
    const month = parseInt(str.slice(4, 6)) - 1;
    const day = parseInt(str.slice(6, 8));
    return new Date(year, month, day);
  };

  // 필터 + 정렬
  const getFilteredData = () => {
    const filtered = animals.filter((a) => {
      const sName = a.SHTER_NM?.trim();
      const sAddr = a.REFINE_ROADNM_ADDR?.trim() || a.REFINE_LOTNO_ADDR?.trim();
      return sName === decodedName && sAddr === decodedAddr;
    });

    return filtered.sort((a, b) => {
      const dateA = parseDate(a.RECEPT_DE); // 실종일자 기준
      const dateB = parseDate(b.RECEPT_DE);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  };

  return (
    <div className="ShelterAnimalList">
      <Header leftChild />
      <div className="ShelterAnimalList-container inner">
        <div className="PageTitle">
          <h3>해당 보호소 유기동물</h3>
        </div>
        <div className="SearchBar">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">최신순</option>
            <option value="oldest">오래된순</option>
          </select>
        </div>
        <div className="ShelterAnimalItems">
          {getFilteredData().map((item) => (
            <ShelterAnimalItem
              key={item.ABDM_IDNTFY_NO}
              petId={item.ABDM_IDNTFY_NO}
              petAge={item.AGE_INFO}
              petColor={item.COLOR_NM}
              petType={item.SPECIES_NM}
              petMissingDate={item.RECEPT_DE}
              imageUrl={item.IMAGE_COURS}
              onClick={() => {
                setSelectedAnimal(item);

                toggleModal();
              }}
            />
          ))}
        </div>

        {isActive && (
          <ShelterAnimalModalDetail
            animal={selectedAnimal}
            onClose={() => {
              toggleModal();
              setSelectedAnimal(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ShelterAnimalList;
