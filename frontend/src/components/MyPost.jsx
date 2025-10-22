import "../style/MyPost.css";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import MypageModalDetail from "./MypageModalDetail";
import { useModal } from "../hooks/ModalContext";
import MyPostReportItem from "./MyPostReportItem";
import MyPostMissingItem from "./MyPostMissingItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

const MyPost = () => {
  const nav = useNavigate();
  const { isActive, toggleModal } = useModal();
  const { api } = useAuth();
  const [ myMissing, setMyMissing ] = useState([]);
  const [ petMissingItem, setPetMissingItem ] = useState(null);
  const [page, setPage] = useState(1);
  const itemSize = 2;
  const [reports, setReports] = useState([]);
  const [totalReports, setTotalReports] = useState(0);

  const onPageClick = (page) => setPage(page);
  const [modalData, setModalData] = useState(null);
  useEffect(() => {
    if (isActive) toggleModal();
    const fetchMyMissing = async () => {
      try {
          const response = await api.get("/api/missing/me");
          setMyMissing(response.data);
          if(response.data.length > 0){
              setPetMissingItem(response.data[0]);
          }
      } catch (error) {
          console.error("Failed to fetch missing:", error);
      }
    };
    fetchMyMissing();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [petMissingItem]);

    useEffect(() => {
      const fetchReports = async () => {
        if (!petMissingItem) return; // 반려동물이 선택되지 않았으면 아무것도 가져오지 않음
        try {
          // API 엔드포인트에 petMissingId, page, itemSize를 파라미터로 전달합니다.
          const response = await api.get(
            `/api/report/missing/${petMissingItem.id}`,
            {
              params: {
                page: page - 1,
                size: itemSize,
                sort: "createdAt,desc"
              },
            }
          );
          setReports(response.data.content); // 응답 데이터의 'content' 배열을 reports 상태에 저장
          setTotalReports(response.data.totalElements); // 응답 데이터의 'totalElements'를 totalReports 상태에 저장
        } catch (error) {
          console.error("Failed to fetch reports:", error);
        }
      };
      fetchReports();
    }, [petMissingItem, page]);

  return (
    <div className="MyPost">
      <div className="post-title">
        <h3>나의 실종신고</h3>
      </div>
      <div className="post-content">
        <div className="none-text">
          <p>현재 실종신고가 존재하지 않습니다.</p>
        </div>
        {(
          <>
            <div className="missing">
              {myMissing.map((item) => {
                return (
                  <MyPostMissingItem
                    key={`petMissing${item.id}`}
                    petName={item.petName}
                    isActive={item.id === petMissingItem.id}
                    onClick={() => setPetMissingItem(item)}
                  />
                );
              })}
            </div>
            {petMissingItem && (
            <div className="MyPostMissingList">
              <div className="MyPostMissingList-container">
                <div className="title">
                  <p>{petMissingItem.title}</p>
                </div>
              </div>
              <div className="btn">
                <p
                  onClick={() => {
                    nav(`/missingRevise/${petMissingItem.id}`);
                  }}
                >
                  수정
                </p>
                <span>|</span>
                <p
                  onClick={async () => {
                    if (
                      confirm(
                        `${petMissingItem.petName}의 실종신고를 정말 삭제하시겠습니까?`
                      )
                    ) {
                      try {
                        await api.delete(`/api/missing/${petMissingItem.id}`);
                        const updatedMissingList = myMissing.filter(
                          (item) => item.id !== petMissingItem.id
                        );
                        setMyMissing(updatedMissingList);
                        setPetMissingItem(updatedMissingList.length > 0 ? updatedMissingList[0] : null);
                      } catch (error) {
                        console.error("Failed to delete missing item:", error);
                        alert("삭제에 실패했습니다.");
                      }
                    }
                  }}
                >
                  삭제
                </p>
              </div>
            </div>
            )}
            <div className="report">
              {reports.map((item) => {
                return (
                  <MyPostReportItem
                    key={`petReport${item.id}`}
                    title={item.title}
                    content={item.content}
                    petImage={item.petImage}
                    onClick={() => {
                      setModalData(item);
                      toggleModal();
                    }}
                  />
                );
              })}
            </div>
            <Pagination
              totalItems={totalReports}
              page={page}
              onClick={onPageClick}
              itemSize={itemSize}
            />
          </>
        )}
      </div>
      <MypageModalDetail {...modalData} />
    </div>
  );
};
export default MyPost;
