import { UIState } from './';

type UIActionType = 
| { type: '[UI] - Open Sidebar' }
| { type: '[UI] - Close Sidebar' }
| { type: '[UI] - set isAddingEntry', payload: boolean }
| { type: '[UI] - set isDraggingEntry', payload: boolean }


export const uiReducer = ( state: UIState, action: UIActionType ): UIState => {

    switch (action.type) {
        case '[UI] - Open Sidebar':
            return {
                ...state,
                sidemenuOpen: true
            };

        case '[UI] - Close Sidebar':
            return {
                ...state,
                sidemenuOpen: false
            };

        case '[UI] - set isAddingEntry':
            return {
                ...state,
                isAddingEntry: action.payload,
            };

        case '[UI] - set isDraggingEntry':
            return {
                ...state,
                isDraggingEntry: action.payload
            };
    
        default:
            return state;      
    };
};