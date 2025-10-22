import { useEffect, useState } from "react";

const useShelterData = () => {
  const [animals, setAnimals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await fetch(
          "https://openapi.gg.go.kr/AbdmAnimalProtect?Key=f2f06fff472f435591f277efff82fd36&Type=json&pIndex=1&pSize=100"
        );
        const json = await res.json();

        const items = json.AbdmAnimalProtect?.[1]?.row || [];
        setAnimals(items);
      } catch (err) {
        console.error("API 호출 실패:", err);
        setError(err);
      }
    };

    fetchAnimals();
  }, []);

  return { animals, error };
};

export default useShelterData;


