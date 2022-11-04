import { Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { Pause, PlayArrow } from '@mui/icons-material';

const AudioDisplayCard = ({autor, papel, timestamp, audio, category}) => {

    const audioSource = new Audio(audio);
    const playAudio = (sound) => { sound.play() }
    const pauseAudio = (sound) => { sound.pause() }

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