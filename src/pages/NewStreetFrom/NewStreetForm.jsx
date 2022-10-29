import { useRef, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import {Recorder} from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'

const NewStreetForm = ({open, setOpen}) => {

    const [ audioState, setAudioState ] = useState({audioDetails:
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
    const descriptionElementRef = useRef(null);
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
    if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
        descriptionElement.focus();
        }
    }
    }, [open])

    const handleAudioStop = (data) => {
        console.log(data);
        setAudioState({ audioDetails: data });
    }

    // const handleCountDown = (data) => {
    //     console.log(data);
    // }

    const handleAudioUpload = (file) => {
        console.log(file);
    }
    
    const handleRest = () => {
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
            scroll={'paper'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <Recorder
                    record={true}
                    title={"New recording"}
                    audioURL={audioState.audioDetails.url}
                    hideHeader ={true}
                    showUIAudio
                    handleAudioStop={data => handleAudioStop(data)}
                    // handleCountDown={data => handleCountDown(data)}
                    handleAudioUpload={data => handleAudioUpload(data)}
                    handleRest={() => handleRest()}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
        </Dialog>

    )

}


export default NewStreetForm