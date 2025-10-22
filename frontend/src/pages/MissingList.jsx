import "../style/MissingList.css";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import MissingItem from "../components/MissingItem";
import PetModalDetail from "../components/PetModalDetail";
import { useNavigate } from "react-router-dom";
import { useModal } from "../hooks/ModalContext";
import { useAuth } from '../contexts/AuthContext';

const MissingList = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { toggleModal } = useModal();
  const nav = useNavigate();
  const { api, userId } = useAuth();
  const [sortType, setSortType] = useState("latest");
  const [searchInput, setSearchInput] = useState("");
  const [missingList, setMissingList] = useState([]);

  const fetchMissingList = async () => {
      try {
        const response = await api.get("/api/missing", {
          params: {
            searchInput: searchInput,
            sortType: sortType,
          }
        });
        setMissingList(response.data);
      } catch (error) {
        console.error("Failed to fetch missing list:", error);
      }
    };

  useEffect(() => {
      fetchMissingList();
    }, []);

  const onChangeInput = (e) => {
    setSearchInput(e.target.value);
  };

  const onChangeSortType = (e) => {
      setSortType(e.target.value);
    };

  const onClick = () => {
      fetchMissingList();
  };

  return (
    <div className="MissingList">
      <Header leftChild={true} />
      <div className="MissingList-container inner">
        <div className="PageTitle">
          <h3>실종 동물 목록</h3>
        </div>
        {/* search-box */}
        <div className="search-box">
          <select value={sortType} onChange={onChangeSortType}>
            <option value={"latest"}>최신순</option>
            <option value={"oldest"}>오래된 순</option>
          </select>
          <input
            value={searchInput}
            onChange={onChangeInput}
            placeholder="검색할 제목을 입력하세요."
          />
          <Button text={"조회"} type={"Square"} onClick={onClick} />
        </div>
        <div className="MissingItems">
          {missingList.map((item) => (
            <MissingItem
              key={item.id}
              missingDTO={item}
              toggleModal={() => {
                setSelectedItem(item);
                toggleModal();
              }}
              onClick={() => {
                nav(`/missingReport/${item.id}`);
              }}
              myMissing={userId === item.userId}
            />
          ))}
        </div>
        <div className="MissingList-btn">
          <Button
            text={"실종 동물 신고"}
            type={"Square_lg"}
            onClick={() => {
              nav("/missingDeclaration");
            }}
          />
        </div>
      </div>

      {selectedItem && (
        <PetModalDetail
          missingPet={selectedItem}
          onClick={() => {
            nav(`/missingReport/${selectedItem.petMissingId}}`);
          }}
          myMissing={userId === selectedItem.userId}
        />
      )}
    </div>
  );
};
export default MissingList;
