import { useRef } from "react";

// 실종 신고 & 실종 신고 수정 페이지 사용 Hook 생성
// 현재 form, key(missingPet 객체들의 name), label(사용자에게 보여질 이름)
const useFormFocus = (formState, formKeys, formKeysLabel = {}) => {
  const inputRef = useRef({});

  // 비어있는 input 태그 찾기
  const checkInput = () => {
    for (const key of formKeys) {
      // form 에 key 값이 없으면
      if (!formState[key]) {
        alert(`${formKeysLabel[key] || key}을(를) 입력해주세요`);
        inputRef.current[key]?.focus();
        return false;
      }
    }
    return true;
  };

  const handleRef = (key) => (e) => {
    inputRef.current[key] = e;
  };

  return {
    handleRef,
    checkInput,
  };
};

export default useFormFocus;
