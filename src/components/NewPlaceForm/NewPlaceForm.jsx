// import { useRef, useEffect, useState } from 'react';
import { Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import addLocation from '../../helpers/addLocation'


const NewPlaceForm = ({open, setOpen, userLatitude, userLongitude}) => {

    const handleClose = () => { setOpen(false) };
    
    const handleSubmit = (e) => {

        e.preventDefault();
        const form = document.forms.newPlaceForm

        const title = form.newPlaceFormTitle.value
        const description = form.newPlaceFormDescription.value
        const marker = {title, description}

        addLocation(userLatitude, userLongitude, marker)
        setOpen(false)

    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={'paper'}
            aria-labelledby="form to include a new place."
            aria-describedby="A small form"
        >
            <Box component='form' id='newPlaceForm' onSubmit={(e) => handleSubmit(e)}>
                <DialogTitle id="scroll-dialog-title">Adicionar Novo Local</DialogTitle>
                <DialogContent dividers={scroll === 'paper'} className='newPlaceFormContainer' >
                        <TextField
                            required
                            id="newPlaceFormTitle"
                            label="Nome da Locação"
                        />
                        <TextField
                            required
                            id="newPlaceFormDescription"
                            label="Fale sobre o nome da rua"
                            multiline
                            rows={4}
                        />
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='error' onClick={handleClose}>Cancel</Button>
                    <Button type='submit' variant='contained'>Enviar</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )

}

export default NewPlaceForm

NewPlaceForm.propTypes = {
    userLatitude: PropTypes.number, 
    userLongitude: PropTypes.number, 
    open: PropTypes.bool,
    setOpen: PropTypes.func,
}