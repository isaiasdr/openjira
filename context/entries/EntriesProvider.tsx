import { useSnackbar } from 'notistack';
import { FC, useEffect, useReducer } from 'react';
import { entriesApi } from '../../apis';

import { Entry } from '../../interfaces';

import { EntriesActionType, EntriesContext, entriesReducer } from './';


export interface EntriesState {
    entries: Entry[];
};

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
};

export const EntriesProvider:FC = ({ children }) => {

    const [state, dispatch] = useReducer( entriesReducer , ENTRIES_INITIAL_STATE );
    const { enqueueSnackbar } = useSnackbar();

    const addEntry = async (description: string)  => {
        const { data } = await entriesApi.post<Entry>('/entries', { description });
        
        const action: EntriesActionType = {
            type: '[Entry] - Add Entry',
            payload: data
        };

        dispatch( action );
    };

    const updateEntry = async ( { _id, description, status }: Entry, showSnackbar: boolean = false ) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status });
            dispatch({ type: '[Entry] - Updated Entry', payload: data });

            if ( showSnackbar ) {
                enqueueSnackbar('Entrada actualizada' , {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    }
                });
            }

        } catch (error) {
            console.log({ error });
        }
    };

    const deleteEntry = async ( { _id }: Entry ) => {
        try {
            await entriesApi.delete(`/entries/${ _id }`);
            dispatch({ type: '[Entry] - Remove Entry', payload: _id });

            enqueueSnackbar('Entrada Eliminada' , {
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }
            });
            

        } catch (error) {
            console.log({ error });
        }
    };

    const refreshEntries = async() => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] - Refresh Data', payload: data });
    };

    useEffect(() => {
        refreshEntries();
    }, []);
    
    return (
        <EntriesContext.Provider value = {{
            ...state,

            //methods
            addEntry,
            updateEntry,
            deleteEntry,
        }}>
            { children }
        </EntriesContext.Provider>
    );
};