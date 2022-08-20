import { createContext, useContext, useState } from 'react';

export const ModalOnContext = createContext();

export const useModalOn = () => useContext(ModalOnContext);

const ModalOnProvider = ({ children }) => {
    const [modalOn, setModalOn] = useState(false);

    return (
        <ModalOnContext.Provider
            value={{
                modalOn,
                setModalOn
            }}
        >
            {children}
        </ModalOnContext.Provider>
    );
}

export default ModalOnProvider
