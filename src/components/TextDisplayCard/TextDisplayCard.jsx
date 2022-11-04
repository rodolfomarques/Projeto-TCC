import { Box, Typography, Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';

const TextDisplayCard = ({autor, papel, timestamp, texto, category}) => {
    return (
        <Card className="textCard">
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1}} >
                    <Typography variant="subtitle1" >{autor}</Typography>
                    <Typography gutterBottom variant="subtitle2" color="text.secondary" sx={{mb: 0}}>({papel} - {timestamp})</Typography>
                </Box>
                <Typography gutterBottom variant="subtitle2" color="text.secondary">{category}</Typography>
                <Typography variant="body2">
                    {texto}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default TextDisplayCard

TextDisplayCard.propTypes = {

    autor: PropTypes.string, 
    papel: PropTypes.string, 
    timestamp: PropTypes.string, 
    texto: PropTypes.string,
    category: PropTypes.string,

}