export function appRoutineLocationStarter(setLatitude, setLongitude) {

    if('geolocation' in navigator) {

        navigator.geolocation.watchPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        })

        return true

    } else {

        setLatitude(-7.119335);
        setLongitude(-34.823671);

    }

}