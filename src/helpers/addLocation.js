
const addLocation = (setLocation, latitude, longitude, marker) => {

    const newLocation = {
        id: 10,
        latitude, 
        longitude,
        marker,
        content: {
            historia: {
                textContent: [],
                audioContent: []
            },
            descricao: {
                textContent: [],
                audioContent: []
            }
        }
    }

    setLocation(prevState => [...prevState, newLocation])

}


export default addLocation;