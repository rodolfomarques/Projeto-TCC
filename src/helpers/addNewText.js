import db from "../services/firebase";
import { ref, set, get } from "firebase/database";
import { v4 as uuidv4 } from "uuid"

export default async function addNewText (type, placeID, author, role, category, content, setReload) {
    // tipo história ou descrição
    // fazer um get do tipo acima e chamar os textos

    let id = uuidv4()
    const hoje = new Date()

    let newText = {
        id,
        "place-id": placeID,
        author,
        role,
        "timestamp": `${hoje.getDate()}/${hoje.getMonth() + 1}/${hoje.getFullYear()}`,
        category,
        content
    }

    const dbText = await get(ref(db, `${type}/textContent`))
    .then(snapshot => snapshot.val())

    console.log();

    set(ref(db, `${type}/textContent`), [...dbText, newText])
    setReload('')
    

}