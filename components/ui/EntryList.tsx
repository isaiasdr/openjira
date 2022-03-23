import { DragEvent, FC, useMemo, useContext } from 'react'
import { List, Paper } from '@mui/material';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import { EntryStatus } from '../../interfaces';
import { EntryCard } from './';

import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext( EntriesContext );
    const { isDraggingEntry, setIsDraggingEntry } = useContext( UIContext );

    const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ) , [ entries ] );
    
    const allowDrop = ( event: DragEvent<HTMLDivElement> ) => {
        event.preventDefault();
    };

    const onDropEntry = ( event: DragEvent<HTMLDivElement> ) => {
        const id = event.dataTransfer.getData('text');
        
        const entry = entries.find( entry => entry._id === id )!;
        updateEntry({ ...entry, status });

        setIsDraggingEntry(false);
    };

    return (
        
        <div
            onDrop={ onDropEntry }
            onDragOver= { allowDrop }
            className={ isDraggingEntry ? styles.dragging : '' }
        >
            <Paper sx={{ height: 'calc(100vh - 200px)', overflow: 'auto', backgroundColor: 'transparent', padding: '1px 10px' }}>
                
                <List sx={{ opacity: isDraggingEntry ? 0.5 : 1, transition: 'all 0.3s' }}>
                    {
                        entriesByStatus.map( entry => (
                            <EntryCard key={ entry._id } entry={ entry } />
                        ))
                    }
                </List>
            </Paper>
        </div>
    );
};
