import { ChangeEvent, FC, useMemo, useState, useContext } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from '@mui/material';
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Layout } from '../../../components/layouts';
import { Entry, EntryStatus } from '../../../interfaces';
import { dbEntries } from '../../../database';
import { EntriesContext } from '../../../context/entries';
import { dateFunctions } from '../../../utils';


const validStatus: EntryStatus[] = [ 'pending', 'in-progress', 'finished' ];

interface Props {
    entry: Entry
}

const EntryPage: FC<Props> = ({ entry }) => {

    const { updateEntry, deleteEntry } = useContext( EntriesContext );

    const [ inputValue, setInputValue ] = useState(entry.description);
    const [ status, setStatus ] = useState<EntryStatus>(entry.status);
    const [ touched, setTouched ] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

    const { replace } = useRouter();

    const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const onStatusChanged = ( e: ChangeEvent<HTMLInputElement> ) => {
        setStatus( e.target.value as EntryStatus );
    };

    const onSave = () => {

        if( inputValue.trim().length === 0 ) return;

        const updatedEntry: Entry = { ...entry, description: inputValue, status };

        updateEntry( updatedEntry, true);
    };

    const onDelete = () => {
        deleteEntry( entry );
        replace( '/' );
    };

    const date = dateFunctions.getFormatDistanceToNow( entry.createdAt );

    return (
        <Layout title={ inputValue.substring(0,20) + '...' }>
            <Grid container justifyContent='center' sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader title={`Entrada: ${inputValue}`} subheader={ date } />

                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder='Nueva Entrada'
                                autoFocus
                                multiline
                                label='Nueva Entrada'
                                value={ inputValue }
                                onChange= { onInputValueChanged }
                                onBlur={ () => setTouched(true) }
                                helperText={ isNotValid && 'Ingrese un valor' }
                                error={ isNotValid }
                            />
                            
                            <FormControl sx={{ marginTop: 2 }}>
                                <FormLabel> Estado: </FormLabel>
                                <RadioGroup row value={ status } onChange={ onStatusChanged }>
                                    {
                                        validStatus.map(option => (
                                            <FormControlLabel
                                                key={ option }
                                                value={ option }
                                                control={ <Radio /> }
                                                label={ capitalize(option) }
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                            
                        </CardContent>

                        
                        <CardActions>
                            <Button 
                                startIcon={ <SaveAsOutlinedIcon /> }
                                variant='contained'
                                fullWidth
                                onClick={ onSave }
                                disabled={ inputValue.length <= 0 }
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            <IconButton onClick={ onDelete } sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark' }}>
                <DeleteOutlineOutlinedIcon />
            </IconButton>

        </Layout>
    );
};

export default EntryPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    
    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById( id );

    if ( !entry ) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    
    return {
        props: {
            entry
        }
    }
}