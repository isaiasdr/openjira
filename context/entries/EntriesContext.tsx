import { createContext } from 'react';
import { Entry } from '../../interfaces';


export interface ContextProps {
    entries: Entry[];

    //methods
    addEntry: (description: string) => void,
    updateEntry: (entry: Entry, showSnackbar?: boolean) => void,
    deleteEntry: ({ _id }: Entry) => Promise<void>,
};

export const EntriesContext = createContext({} as ContextProps );