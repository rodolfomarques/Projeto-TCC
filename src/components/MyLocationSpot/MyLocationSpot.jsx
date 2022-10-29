import { Marker } from 'react-leaflet'
import PropTypes from 'prop-types';
import leafleatIcon from '../../helpers/leafleatIcon';
import myLocation from '../../assets/images/my_location.svg';

const MyLocationSpot = ({latitude, longitude}) => {

    return (
        <Marker position={[latitude, longitude]} icon={leafleatIcon(myLocation, 35, 35, 'myLocationIcon')} />
    )
}

export default MyLocationSpot

MyLocationSpot.propTypes = {

    latitude: PropTypes.number,
    longitude: PropTypes.number

}