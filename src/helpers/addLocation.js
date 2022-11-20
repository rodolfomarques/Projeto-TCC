import db from "../services/firebase";
import { ref, set, get } from "firebase/database";
import { v4 as uuidv4 } from "uuid"

const addLocation = async (latitude, longitude, marker) => {

    let id = uuidv4()

    let place = {latitude, longitude, "place-id": id}
    let pin = {...marker, "place-id": id}

    let dbMarkers = await get(ref(db, "markers"))
    .then((snapshot) => {
        return snapshot.val();
    })

    let dbPlace = await get(ref(db, `place`))
    .then((snapshot) => {
        return snapshot.val();
    })

    set(ref(db, "markers"), [...dbMarkers, pin] )
    set(ref(db, `place`), [...dbPlace, place])

}


export default addLocation;