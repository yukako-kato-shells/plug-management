import React, { createContext, useState } from 'react'

type MenuContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuContext = createContext<MenuContextType>({ isOpen: false, setIsOpen: () => { } });

type Props = {
  children?: JSX.Element;
};

const MenuProvider = ({ children }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const value: MenuContextType = {
    isOpen,
    setIsOpen,
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
