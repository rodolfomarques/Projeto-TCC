import { Typography, Card, CardContent } from '@mui/material';
import PropTypes from 'prop-types';

const TextDisplayCard = ({autor, papel, timestamp, texto}) => {
    return (
        <Card className="textCard">
            <CardContent>
                <Typography variant="subtitle1" >{autor}</Typography>
                <Typography gutterBottom variant="subtitle2" color="text.secondary">{papel} - {timestamp}</Typography>
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
    texto: PropTypes.string

}