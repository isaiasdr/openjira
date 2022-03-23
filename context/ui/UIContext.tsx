import { createContext } from 'react';


export interface ContextProps {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDraggingEntry: boolean;

    //methods
    openSideMenu: () => void;
    closeSideMenu: () => void;

    setIsAddingEntry: (boolean: boolean) => void;

    setIsDraggingEntry: (isDragging: boolean) => void;
};

export const UIContext = createContext({} as ContextProps );