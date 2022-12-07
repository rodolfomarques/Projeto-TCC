import { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import { Pause, PlayArrow } from '@mui/icons-material';
import { storage } from '../../services/firebase';
import { ref, getDownloadURL } from "firebase/storage";
import PropTypes from 'prop-types';

const AudioDisplayCard = ({autor, papel, timestamp, audio, category}) => {

    const [ audioURl, setAudioURL ] = useState('')

    const audioSource = new Audio(audioURl);
    const playAudio = (sound) => { sound.play() }
    const pauseAudio = (sound) => { sound.pause() }

    useEffect(() => {

        getDownloadURL(ref(storage, audio))
        .then((url) => { setAudioURL(url); console.log(url); })
        .catch((err) => {
            console.log(err);
        });

    }, [])

    return (
        <Card className="audioCard">
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1}} >
                    <Typography variant="subtitle1" >{autor}</Typography>
                    <Typography gutterBottom variant="subtitle2" color="text.secondary" sx={{mb: 0}}>({papel} - {timestamp})</Typography>
                </Box>
                <Typography gutterBottom variant="subtitle2" color="text.secondary">{category}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="play" onClick={() => playAudio(audioSource)}>
                        <PlayArrow sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="pause" onClick={() => pauseAudio(audioSource)}>
                        <Pause />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
}

export default AudioDisplayCard

AudioDisplayCard.propTypes = {

    autor: PropTypes.string, 
    papel: PropTypes.string, 
    timestamp: PropTypes.string, 
    audio: PropTypes.string,
    category: PropTypes.string,

}