import { storage, db } from "../services/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { ref as dbRef, set, get } from "firebase/database";
import { v4 as uuidv4 } from "uuid"


export default async function uploadAudio(type, placeID, author, role, category, file) {

    let id = uuidv4()
    const storageRef = ref(storage, `${placeID}/${type}/${id}.mp3`);

    uploadBytes(storageRef, file).then(async (snapshot) => {

        const hoje = new Date()

        let newAudio = {
            id,
            "place-id": placeID,
            author,
            role,
            "timestamp": `${hoje.getDate()}/${hoje.getMonth() + 1}/${hoje.getFullYear()}`,
            category,
            title: "Título sobre o local",
            content: `${placeID}/${type}/${id}.mp3`
        }

        const dbText = await get(dbRef(db, `${type}/audioContent`))
        .then(snapshot => snapshot.val())

        set(dbRef(db, `${type}/audioContent`), [...dbText, newAudio])
    });

} 