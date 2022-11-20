import { useState, useEffect, createContext, lazy, Suspense  } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { appRoutineLocationStarter } from '../../helpers/appRoutineLocationStarter';
import loadInicialData from '../../helpers/loadInitialData';

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
    const [ placeID, setPlaceID ] = useState('')
    const [ reload, setReload ] =  useState('')

    useEffect(() => {

        appRoutineLocationStarter(setUserLatitude, setUserLongitude);
        loadInicialData(setLocations)

    }, [])

    const value = {
        setOpenNewPlaceForm,
        setOpenStreetDetails,
        setContentSelector,
        setContent,
        setPlaceID,
        reload, 
        setReload,
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
                                        placeID={location.marker["place-id"]}
                                    />
                                )
                            })
                        }
                        <NewPlaceForm open={openNewPlaceForm} setOpen={setOpenNewPlaceForm} userLatitude={userLatitude} userLongitude={userLongitude} />
                        <StreetDetails open={openStreetDetails} setOpen={setOpenStreetDetails} contentSelector={contentSelector} content={content} placeID={placeID} />
                        <SpeedDialButton />
                </Suspense>
            </MapContainer>
        </ComponentContext.Provider>
    )

    
}

export default Home;