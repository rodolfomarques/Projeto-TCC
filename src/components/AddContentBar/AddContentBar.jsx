import { Box, Button, Typography, Divider } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import PropTypes from 'prop-types';

const AddContentBar = ({setOpenRecorder, setOpenWriter}) => {

    const openRecorder = () => {setOpenRecorder(true)}
    const openWriter = () => {setOpenWriter(true)}

    return (
        <>
            <Divider sx={{mt: 4}}>
                <Typography variant='h5' sx={{textAlign: 'center', }}>Adicionar conteúdos</Typography>
            </Divider>
            <Box component='section' sx={{display: 'flex', justifyContent: 'center', mt: 1}}>
                <Button variant="contained" size='small' startIcon={<TextFormatIcon />} sx={{mr: 1}} onClick={openWriter}>Texto</Button>
                <Button variant="contained" size='small' startIcon={<MicIcon />} onClick={openRecorder}>Audio</Button>
            </Box>
        </>
    )

}

AddContentBar.propTypes = {

    setOpenRecorder: PropTypes.func,
    setOpenWriter: PropTypes.func,
    
}

export default AddContentBar;