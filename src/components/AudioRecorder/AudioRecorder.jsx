import { useRef, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, 
         DialogTitle, Box, FormControl, FormLabel, RadioGroup, 
         FormControlLabel, Radio, TextField, Divider, CircularProgress } from '@mui/material';

import PropTypes from 'prop-types';
import uploadAudio from '../../helpers/uploadAudio';
import Lottie from "lottie-react";
import recordingAnimation from '../../assets/images/recording_animation.json'

import { FiberManualRecord, Stop } from '@mui/icons-material';

const AudioRecorder = ({open, setOpen, contentSelector, placeID}) => {

    const [ radioValue, setRadioValue ] = useState('');
    const [ mediaObject, setMediaObject ] = useState(null);
    const [ recorder, setRecorder ] = useState({});
    const [ audio, setAudio ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const audioPlayer = useRef(null);
    const lottieRef = useRef();

    const handleClose = () => { setOpen(false) };

    const startRecorder = () => { recorder.start(); lottieRef.current.play() }
    const stopRecorder = () => { recorder.stop(); lottieRef.current.stop() }

    const onSubmitForm = (e) => {

        e.preventDefault();
        setLoading(true)

        const form = document.forms.newAudioForm;
        const author = form.newAudioAuthor.value;
        const category = radioValue;
        const role = "Editor"
        audio

        if(audio!== null && category !== '') {
            uploadAudio(contentSelector, placeID, author, role, category,audio)
            .then(() => { handleClose(); })
            .catch(() => { setLoading(false) })
        }

    }
    
    useEffect(() => {

        if(open){

            navigator.mediaDevices.getUserMedia({audio:true})
            .then(mediaStreamObj => { setMediaObject(mediaStreamObj) })
            .catch(err => {console.log(err.name, err.message) })

        }

    },[open])

    useEffect(() => {

        if(open) {

            const audioPreviewPlayer = audioPlayer.current
            if( mediaObject !== null) {
    
                const mediaRecorder = new MediaRecorder(mediaObject);
                let audioData = [];
    
                mediaRecorder.ondataavailable = (e) => { audioData.push(e.data) }
    
                mediaRecorder.onstop = () => {
    
                    let audioFile = new Blob(audioData, { 'type': 'audio/mp3;' });
                    setAudio(audioFile);
                    audioData = [];

                    let audioSrc = window.URL.createObjectURL(audioFile);
                    audioPreviewPlayer.src = audioSrc;
                }
                
                setRecorder(mediaRecorder);
            }

        }


    }, [mediaObject])


    return (

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <Box component='form' id='newAudioForm' onSubmit={(e) => {onSubmitForm(e)}}>
                <DialogTitle>Gravador</DialogTitle>
                <DialogContent>
                    <Box sx={{pt:1, pb:1}}>
                        <TextField
                            required
                            id="newAudioAuthor"
                            label="Autor"
                            fullWidth
                        />
                    </Box>
                    <FormControl>
                        <Divider sx={{mt: 2, mb:1}}>
                            <FormLabel>Categoria</FormLabel>
                        </Divider>
                        <RadioGroup
                            aria-labelledby="categorias"
                            name="radio-buttons-group"
                            id='newAudioCategory'
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
                                        <FormControlLabel value="Cuidados Necessários" control={<Radio />} label="Responsáveis e os cuidados necessários" />
                                        <FormControlLabel value="Manutenção" control={<Radio />} label="Estado atual do local" />
                                    </>
                                )
                            }
                        
                        </RadioGroup>
                    </FormControl>
                    <Divider sx={{mt: 2, mb:2}} />
                    
                    {!loading && (
                        <Box sx={{display:'flex', flexDirection:'column', alignItems: 'center', gap:2}}>
                            <Lottie 
                                animationData={recordingAnimation}
                                style={{height: '150px', width: '150px', margin: '-40px 0px'}}
                                autoplay={false}
                                lottieRef={lottieRef}
                            />
                            <audio controls ref={audioPlayer}></audio>
                            <Box sx={{display:'flex', gap: 2, justifyContent: 'center'}}>
                                <Button 
                                    aria-label="Gravar" 
                                    color='error' 
                                    startIcon={<FiberManualRecord size="large" />}
                                    variant='contained'
                                    size="small"
                                    onClick={startRecorder}
                                >
                                    Gravar
                                </Button>
                                <Button 
                                    aria-label="Parar Gravação" 
                                    // color='info' 
                                    startIcon={<Stop size="large" />} 
                                    variant='contained'
                                    size="small"
                                    onClick={stopRecorder}
                                >
                                    Parar Gravação
                                </Button>
                            </Box>
                        </Box>
                    )}

                </DialogContent>

                { loading && ( <CircularProgress color="success" /> ) }

                <DialogActions>
                    <Button variant='contained' type='submit'>Enviar</Button>
                    <Button variant='contained' color='error' onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Box>
        </Dialog>

    )

}


export default AudioRecorder

AudioRecorder.propTypes = {
    open: PropTypes.bool, 
    setOpen: PropTypes.func,
    contentSelector: PropTypes.string,
    placeID: PropTypes.string,

}