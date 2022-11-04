import { useState } from 'react';
import { Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle,
        FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@mui/material';
import PropTypes from 'prop-types';


const TextWriter = ({open, setOpen, contentSelector}) => {

    const [ radioValue, setRadioValue ] = useState('')

    const handleClose = () => { setOpen(false) };

    const handleSubmit = (e) => {
        
        e.preventDefault();
        const form = document.forms.newTextForm;
        const category = radioValue;
        const author = form.newTextAuthor.value;
        const content = form.newTextContent.value;

        // setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={'paper'}
            aria-labelledby="form to include a new place."
            aria-describedby="A small form"
        >
            <Box component='form' id='newTextForm' onSubmit={(e) => handleSubmit(e)}>
                <DialogTitle >Adicionar Texto</DialogTitle>
                <DialogContent dividers={scroll === 'paper'} className='newPlaceFormContainer' >
                        <FormControl>
                            <FormLabel>Categoria</FormLabel>
                            <RadioGroup
                                aria-labelledby="categorias"
                                name="radio-buttons-group"
                                id='newTextCategory'
                                value={radioValue}
                                onChange={(e) => setRadioValue(e.target.value)}
                            >
                                {
                                    contentSelector === 'historia' && (
                                        <>
                                            <FormControlLabel value="Pessoas Envolvidas" control={<Radio />} label="Pessoas envolvidas com o lugar" />
                                            <FormControlLabel value="Elementos Naturais" control={<Radio />} label="Elementos presentes no ambiente natural." />
                                            <FormControlLabel value="Elementos Construídos" control={<Radio />} label="Elementos construídos no lugar" />
                                        </>
                                    )
                                }
                                
                                {
                                    contentSelector === 'descricao' && (
                                        <>
                                            <FormControlLabel value="Ocupações anteriores" control={<Radio />} label="Ocupações anteriores" />
                                            <FormControlLabel value="Materiais do local" control={<Radio />} label="Materiais que constituem os elementos do lugar" />
                                            <FormControlLabel value="Técnicas de Construção" control={<Radio />} label="Técnicas utilizadas na construção" />
                                            <FormControlLabel value="Medidas aproximadas" control={<Radio />} label="Medidas aproximadas" />
                                            <FormControlLabel value="Atividades Realizadas" control={<Radio />} label="Principais atividades realizadas" />
                                            <FormControlLabel value="Cuidados Necessários" control={<Radio />} label="Responsáveis e os cuidados cuidados necessários" />
                                            <FormControlLabel value="Manutenção" control={<Radio />} label="Estado atual do local" />
                                        </>
                                    )
                                }
                            
                            </RadioGroup>
                        </FormControl>
                        <TextField
                            required
                            id="newTextAuthor"
                            label="Autor"
                        />
                        <TextField
                            required
                            id="newTextContent"
                            label="Texto"
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

export default TextWriter;

TextWriter.propTypes = {

    open: PropTypes.bool,
    setOpen: PropTypes.func,
    contentSelector: PropTypes.string,

}