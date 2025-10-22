import { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const toggleModal = () => setIsActive((prev) => !prev);

  return (
    <ModalContext.Provider value={{ isActive, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
