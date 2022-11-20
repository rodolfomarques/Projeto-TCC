import db from "../services/firebase";
import { ref, onValue } from 'firebase/database';

const loadInicialData = (setLocations) => {
    
    onValue(ref(db), (snapshot) => {

        const data = snapshot.val()
        const places = data.place;
        const markers = data.markers;
        const historias = data.historia;
        const descricoes = data.descricao;

        const locations = [];

        places.forEach(place => {
            
            let location;
            const histTextContent = []
            const histAudioContent = []
            const desctTextContent = []
            const descAudioContent = []
            
            const marker = markers.find(item => item["place-id"] === place["place-id"]? true: false);
            historias.textContent.forEach(item => { if(item["place-id"] === place["place-id"]){ histTextContent.push(item) } })
            historias.audioContent.forEach(item => { if(item["place-id"] === place["place-id"]){ histAudioContent.push(item) } })
            descricoes.textContent.forEach(item => { if(item["place-id"] === place["place-id"]){ desctTextContent.push(item) } })
            descricoes.audioContent.forEach(item => { if(item["place-id"] === place["place-id"]){ descAudioContent.push(item) } })

            location = {
                ...place, 
                marker, 
                content: {
                    historia: {
                        textContent: [...histTextContent], 
                        audioContent: [...histAudioContent] 
                    },
                    descricao: {
                        textContent: [...desctTextContent], 
                        audioContent: [...descAudioContent] 
                    }
                } 
            };

            locations.push(location);
        })

        setLocations(locations)
    })

} 

export default loadInicialData