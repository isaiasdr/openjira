import { ChangeEvent, useContext, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

    const { isAddingEntry, setIsAddingEntry } = useContext( UIContext );
    const { addEntry } = useContext( EntriesContext );

    const [ inputValue, setInputValue ] = useState('');
    const [ touched, setTouched ] = useState(false);

    const onTextFieldChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const onSave = () => {
        if( inputValue.length === 0  ) return ;

        addEntry( inputValue );
        setIsAddingEntry(false);
        setTouched(false);
        setInputValue('');
    };

    return (
        <>
            <Box sx={{ marginBottom: 2, paddingX: 1 }}>
                
                {
                    isAddingEntry ? (
                        <>
                            <TextField
                                fullWidth
                                placeholder='Nueva Entrada'
                                autoFocus
                                label='Nueva Entrada'
                                value = { inputValue }
                                helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor' }
                                error={ inputValue.length <= 0 && touched }
                                multiline
                                sx={{ marginTop: 2, marginButton: 1 }}
                                margin='dense'
                                onChange={ onTextFieldChanged }
                                onBlur={ () => setTouched(true) }
                            />

                            <Box display='flex' justifyContent='space-between'>
                                <Button
                                    variant='outlined'
                                    color='warning'
                                    endIcon={ <CancelPresentationOutlinedIcon /> }
                                    onClick={ () => setIsAddingEntry(false) }
                                >
                                    Cancelar
                                </Button>

                                <Button
                                    variant='outlined'
                                    color='secondary'
                                    endIcon={ <SaveOutlinedIcon /> }
                                    onClick={ onSave }
                                >
                                    Guardar
                                </Button>
                            </Box>
                        </>
                    ) 
                    : (
                        <Button 
                            startIcon={ <AddCircleOutlineOutlinedIcon /> }
                            fullWidth
                            variant='outlined'
                            onClick={ () => setIsAddingEntry(true) }
                        >
                            agregar tarea
                        </Button>
                    )
                }
            </Box>
        </>
    );
};
