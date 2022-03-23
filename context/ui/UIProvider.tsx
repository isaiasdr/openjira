import { FC, useReducer } from 'react';

import { UIContext, uiReducer } from './';


export interface UIState {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDraggingEntry: boolean;
};

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDraggingEntry: false,
};

export const UIProvider:FC = ({ children }) => {

    const [state, dispatch] = useReducer( uiReducer , UI_INITIAL_STATE );

    const openSideMenu = () => {
        dispatch({ type: '[UI] - Open Sidebar' });
    };
    
    const closeSideMenu = () => {
        dispatch({ type: '[UI] - Close Sidebar' });
    };
    
    const setIsAddingEntry = ( isAdding: boolean ) => {
        dispatch({ type: '[UI] - set isAddingEntry', payload: isAdding });
    };

    const setIsDraggingEntry = ( isDragging: boolean ) => {
        dispatch({ type: '[UI] - set isDraggingEntry', payload: isDragging });
    };

    return (
        <UIContext.Provider value = {{
            ...state,

            //methods
            openSideMenu,
            closeSideMenu,
            
            setIsAddingEntry,

            setIsDraggingEntry,
        }}>
            { children }
        </UIContext.Provider>
    );
};