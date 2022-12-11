import { useContext } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Marker, Popup } from 'react-leaflet';
import { ComponentContext } from '../../pages/Home/Home';
import PropTypes from 'prop-types';
import leafleatIcon from '../../helpers/leafleatIcon';
import pinLocation from '../../assets/images/pin-location.svg'

import HistoryIcon from '@mui/icons-material/History';
import DescriptionIcon from '@mui/icons-material/Description';

const PlaceMarker = ({latitude, longitude, marker, content, placeID}) => {

    const { setOpenStreetDetails, setContentSelector, setContent, setPlaceID, setPlaceName } = useContext(ComponentContext)

    return (
        <Marker position={[latitude, longitude]} icon={leafleatIcon(pinLocation, 35, 35, 'place_icon')}>
            <Popup>
                <Typography variant='subtitle1'>{marker.title}</Typography> 
                <Typography variant='body2'>{marker.description}</Typography>
                <Box className='contentGroupButtons'>
                    <Box className='mainContentButtonsGroup'>
                        <Button 
                            variant="outlined" 
                            size='small' 
                            startIcon={<HistoryIcon />}
                            onClick={() => {
                                setContent(content); 
                                setOpenStreetDetails(true); 
                                setContentSelector('historia'), 
                                setPlaceID(placeID)
                                setPlaceName(marker.title)
                            }}
                        > 
                            História 
                        </Button>
                        <Button 
                            variant="outlined" 
                            size='small' 
                            startIcon={<DescriptionIcon />}
                            onClick={() => {
                                setContent(content); 
                                setOpenStreetDetails(true); 
                                setContentSelector('descricao'); 
                                setPlaceID(placeID)
                                setPlaceName(marker.title)
                            }}
                        > 
                            Descrição 
                        </Button>
                    </Box>
                    {/* <Box>
                        <Button variant="contained" size='small' startIcon={<HistoryIcon />}> Avaliação </Button>
                        <Button variant="contained" size='small' startIcon={<HistoryIcon />}> Recomendações </Button>
                        <Button variant="contained" size='small' startIcon={<HistoryIcon />}> Referencias </Button>
                    </Box> */}
                </Box>
            </Popup>
        </Marker>
    )

}

export default PlaceMarker;

PlaceMarker.propTypes = {

    latitude: PropTypes.number,
    longitude: PropTypes.number,
    marker: {
        title: PropTypes.string,
        description: PropTypes.string
    },
    content: PropTypes.object,
    placeID: PropTypes.string,

}