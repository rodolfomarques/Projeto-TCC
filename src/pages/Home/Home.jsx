import { useState, useEffect, createContext, lazy, Suspense  } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { appRoutineLocationStarter } from '../../helpers/appRoutineLocationStarter';
import { ref, onValue } from 'firebase/database';
import db from '../../services/firebase';

const SpeedDialButton = lazy(() => import('../../components/Layout/SpeedDialButton'));
const MyLocationSpot = lazy(() => import('../../components/MyLocationSpot/MyLocationSpot'));
const PlaceMarker = lazy(() => import('../../components/PlaceMarker/PlaceMarker'));
const NewPlaceForm =  lazy(() => import('../../components/NewPlaceForm/NewPlaceForm'));
const StreetDetails = lazy(() => import('../StreetDetails/StreetDetails'));


export const ComponentContext = createContext()

const Home = () => {

    const [ userLatitude, setUserLatitude ] = useState(-7.119335);
    const [ userLongitude, setUserLongitude ] = useState(-34.823671);
    const [ locations, setLocations ] = useState([]);
    const [ openNewPlaceForm, setOpenNewPlaceForm ] = useState(false);
    const [ openStreetDetails, setOpenStreetDetails ] = useState(false);
    const [ contentSelector, setContentSelector ] = useState('');
    const [ content, setContent ] = useState({})

    useEffect(() => {

        appRoutineLocationStarter(setUserLatitude, setUserLongitude);

        onValue(ref(db), (snapshot) => {

            console.log(snapshot.val());
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

    }, [])

    const value = {
        setOpenNewPlaceForm,
        setOpenStreetDetails,
        setContentSelector,
        setContent
    }

    return (
        <ComponentContext.Provider value={value}>
            <MapContainer center={[-7.127682447630575, -34.861136741341845]} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Suspense fallback={<div>Carregando...</div>} >
                        <MyLocationSpot latitude={userLatitude} longitude={userLongitude} />
                        {
                            locations.map((location, i) => {
                                return (
                                    <PlaceMarker 
                                        key={`place-marker-${i}`} 
                                        latitude={location.latitude} 
                                        longitude={location.longitude} 
                                        marker={location.marker} 
                                        content={location.content}
                                    />
                                )
                            })
                        }
                        <NewPlaceForm open={openNewPlaceForm} setOpen={setOpenNewPlaceForm} userLatitude={userLatitude} userLongitude={userLongitude} setLocations={setLocations} />
                        <StreetDetails open={openStreetDetails} setOpen={setOpenStreetDetails} contentSelector={contentSelector} content={content} />
                        <SpeedDialButton />
                </Suspense>
            </MapContainer>
        </ComponentContext.Provider>
    )

    
}

export default Home;