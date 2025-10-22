import "../style/ListItem.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const ShelterListSection = ({ shelters = [], selected }) => {
  const containerRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (!selected || !containerRef.current || !selected.SHTER_ID) return;
    const el = containerRef.current.querySelector(`#item-${selected.SHTER_ID}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selected]);

  return (
    <div className="ListContainer" ref={containerRef}>
      {Array.isArray(shelters) &&
        shelters.map((shelter, index) => {
          const key =
            shelter.SHTER_ID ?? `${shelter.SHTER_NM || "unknown"}-${index}`;

          const name = encodeURIComponent(shelter.SHTER_NM || "unknown");
          const addr = encodeURIComponent(
            shelter.REFINE_ROADNM_ADDR || shelter.REFINE_LOTNO_ADDR || ""
          );

          return (
            <div
              className="ItemListst"
              key={key}
              id={`item-${shelter.SHTER_ID || index}`}
              style={{
                backgroundColor:
                  selected?.SHTER_ID === shelter.SHTER_ID ? "#f0f0f0" : "#fff",
                padding: "30px",
                borderBottom: "1px solid #ddd",
              }}
              onClick={() => {
                if (
                  !shelter.SHTER_NM ||
                  !(shelter.REFINE_ROADNM_ADDR || shelter.REFINE_LOTNO_ADDR)
                ) {
                  alert("보호소 이름이나 주소 정보가 부족합니다.");
                  return;
                }

                navigate(`/shelter/${name}/${addr}`);
              }}
            >
              <strong>{shelter.SHTER_NM || "이름 없음"}</strong>
              <div>
                {shelter.REFINE_ROADNM_ADDR ||
                  shelter.REFINE_LOTNO_ADDR ||
                  "주소 없음"}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ShelterListSection;
