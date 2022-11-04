import { useRef, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';
import { Recorder } from 'react-voice-recorder';
import PropTypes from 'prop-types';
import 'react-voice-recorder/dist/index.css';

const AudioRecorder = ({open, setOpen}) => {

    const descriptionElementRef = useRef(null);
    const [ audioState, setAudioState ] = useState({
        audioDetails:
        {
            url: null,
            blob: null,
            chunks: null,
            duration: {
                h: null,
                m: null,
                s: null,
            }
        }
    });
    

    useEffect(() => {
    if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
        descriptionElement.focus();
        }
    }
    }, [open])

    
    const handleClose = () => { setOpen(false) };
    const handleAudioStop = (data) => { setAudioState({ audioDetails: data }) }
    const handleAudioUpload = (file) => { 

        const audio = new File(file, 'teste')
        
    }

    const handleReset = () => {
        const reset = {
            url: null,
            blob: null,
            chunks: null,
            duration: {
                h: null,
                m: null,
                s: null,
            }
        }
        setAudioState({ audioDetails: reset });
    }

    return (

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <Box sx={{width: '350px'}}>
                <Recorder
                    record={true}
                    title={"New recording"}
                    audioURL={audioState.audioDetails.url}
                    hideHeader ={true}
                    showUIAudio
                    handleAudioStop={data => handleAudioStop(data)}
                    // handleCountDown={data => handleCountDown(data)}
                    handleAudioUpload={data => handleAudioUpload(data)}
                    handleRest={() => {handleReset()}}
                />
            </Box>
        </Dialog>

    )

}


export default AudioRecorder

AudioRecorder.propTypes = {
    open: PropTypes.bool, 
    setOpen: PropTypes.func,
}