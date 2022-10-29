
const addLocation = (setLocation, latitude, longitude, marker) => {

    const newLocation = {
        latitude, 
        longitude,
        marker
    }

    setLocation(prevState => [...prevState, newLocation])

}


export default addLocation;