import { PlaylistAddOutlined } from '@mui/icons-material';
import { Entry } from '../../interfaces';
import { EntriesState } from './';

export type EntriesActionType = 
| { type: '[Entry] - Add Entry', payload: Entry }
| { type: '[Entry] - Remove Entry', payload: String }
| { type: '[Entry] - Updated Entry', payload: Entry }
| { type: '[Entry] - Refresh Data', payload: Entry[] }

export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {

    switch (action.type) {
        case '[Entry] - Add Entry':
            return {
                ...state,
                entries: [ ...state.entries, action.payload ]
            };

        case '[Entry] - Updated Entry':
            return {
                ...state,
                entries: state.entries.map( entry => {
                    if( entry._id === action.payload._id ) {
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }

                    return entry;
                })
            };

        case '[Entry] - Refresh Data':
            return {
                ...state,
                entries: [ ...action.payload ],
            };

        case '[Entry] - Remove Entry':
            return {
                ...state,
                entries: state.entries.filter( entry => entry._id !== action.payload )
            }

        default:
            return state;
    };
};