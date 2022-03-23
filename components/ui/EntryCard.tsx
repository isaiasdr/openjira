import { DragEvent, FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';

import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';
import { dateFunctions } from '../../utils';


interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { setIsDraggingEntry } = useContext( UIContext );
    const { push } = useRouter();

    const date =  dateFunctions.getFormatDistanceToNow( entry.createdAt );

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text', entry._id);
        setIsDraggingEntry( true );
    };

    const onDragEnd = (event: DragEvent<HTMLDivElement>) => {
        setIsDraggingEntry( false );
    };

    const onClick = () => {
        push(`/entries/${ entry._id }`);
    };

    return (
        <Card
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart= { onDragStart }
            onDragEnd= { onDragEnd }
            onClick={ onClick }
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }} >
                        { entry.description }
                    </Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>
                        { date }
                    </Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    );
}; 
