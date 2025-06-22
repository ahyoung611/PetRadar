import { useEffect, useRef } from "react";
import "../style/Map.css";

const coordCache = (() => {
  try {
    return JSON.parse(localStorage.getItem("coordCache") || "{}");
  } catch {
    return {};
  }
})();
function saveLocalCache(cache) {
  localStorage.setItem("coordCache", JSON.stringify(cache));
}

const Map = ({ shelters = [], onSelect, setCenterRef }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const geocoderInstance = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=a62ab991b478d4cfb3a3e5b0c93a3148&libraries=services&autoload=false";
      script.async = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    } else {
      initMap();
    }

    function initMap() {
      window.kakao.maps.load(() => {
        let map = mapInstance.current;
        if (!map) {
          map = new window.kakao.maps.Map(mapRef.current, {
            center: new window.kakao.maps.LatLng(37.5598, 126.9734),
            level: 12,
          });
          mapInstance.current = map;
          geocoderInstance.current = new window.kakao.maps.services.Geocoder();
        }

        // 기존 마커 삭제
        markersRef.current.forEach((m) => m.setMap(null));
        markersRef.current = [];

        if (shelters.length > 0) {
          shelters.forEach((shelter) => {
            const address =
              shelter.REFINE_LOTNO_ADDR || shelter.REFINE_ROADNM_ADDR;
            if (!address) return;

            const addMarker = (coordsObj) => {
              // 혹시 모를 좌표 꼬임 대비해서 lat/lng 파싱
              const lat =
                typeof coordsObj.lat === "string"
                  ? parseFloat(coordsObj.lat)
                  : coordsObj.lat;
              const lng =
                typeof coordsObj.lng === "string"
                  ? parseFloat(coordsObj.lng)
                  : coordsObj.lng;
              const latlng = new window.kakao.maps.LatLng(lat, lng);

              const marker = new window.kakao.maps.Marker({
                map,
                position: latlng,
              });
              markersRef.current.push(marker);

              window.kakao.maps.event.addListener(marker, "click", () => {
                map.setCenter(latlng); // 딱 "해당 shelter" 위치로 중앙 이동
                onSelect?.(shelter);
                map.setLevel(5);
              });
            };

            if (coordCache[address]) {
              addMarker(coordCache[address]);
            } else {
              geocoderInstance.current.addressSearch(
                address,
                (result, status) => {
                  if (status === window.kakao.maps.services.Status.OK) {
                    const coords = {
                      lat: parseFloat(result[0].y),
                      lng: parseFloat(result[0].x),
                    };
                    coordCache[address] = coords;
                    saveLocalCache(coordCache);
                    addMarker(coords);
                  }
                }
              );
            }
          });
        }
      });
    }
    // eslint-disable-next-line
  }, [shelters]);

  useEffect(() => {
    if (setCenterRef) {
      setCenterRef.current = (shelter) => {
        const addr = shelter.REFINE_ROADNM_ADDR || shelter.REFINE_LOTNO_ADDR;
        if (!addr || !geocoderInstance.current || !mapInstance.current) return;
        if (coordCache[addr]) {
          const { lat, lng } = coordCache[addr];
          mapInstance.current.setCenter(new window.kakao.maps.LatLng(lat, lng));
          mapInstance.current.setLevel(9);
        }
      };
    }
  }, [setCenterRef]);

  return (
    <div className="Map">
      <div ref={mapRef} className="Map-box" />
    </div>
  );
};

export default Map;
