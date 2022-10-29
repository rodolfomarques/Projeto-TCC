import { useState, useEffect, createContext } from 'react'
import SpeedDialButton from '../../components/Layout/SpeedDialButton';
import { MapContainer, TileLayer } from 'react-leaflet'
import { appRoutineLocationStarter } from '../../helpers/appRoutineLocationStarter';
import MyLocationSpot from '../../components/MyLocationSpot/MyLocationSpot';
import PlaceMarker from '../../components/PlaceMarker/PlaceMarker';
import NewPlaceForm from '../../components/NewPlaceForm/NewPlaceForm';
import StreetDetails from '../StreetDetails/StreetDetails'

const inicialPlaces = [
    {
        id: 1,
        latitude: -7.1191604053191915, 
        longitude: -34.82359102543302,
        marker: {
            title: 'Busto de Tamandaré', 
            description: `Cartão postal da cidade, muito visitado por turistas.
            Acontece aqui as celebrações de ano novo da cidade. 
            Este lugar foi criando para homenagear o patrono da marinha brasileira. 
            O lugar é ponto de encontro da cidade.`
        },
        content: {
            historia: {
                textContent: [
                    {
                        id: 1,
                        author: 'Rodolfo Marques',
                        role: 'Administrador',
                        timestamp: '29/10/2022',
                        content: `Informe as principais pessoas envolvidas com o lugar.
                        O construtor, o proprietário, o responsável pela manutenção, as pessoas que usufruem do
                        espaço, entre outros. Informe quais são os elementos presentes no ambiente natural.
                        As árvores, vegetação nativa, campo para pasto, rochedos, riachos, trepadeiras,
                        descampado etc.`
                    },
                ],
                audioContent: []
            },
            descricao: {
                textContent: [
                    {
                        id: 1,
                        author: 'Rodolfo Marques',
                        role: 'Administrador',
                        timestamp: '29/10/2022',
                        content: `Informe as principais pessoas envolvidas com o lugar.
                        O construtor, o proprietário, o responsável pela manutenção, as pessoas que usufruem do
                        espaço, entre outros. Informe quais são os elementos presentes no ambiente natural.
                        As árvores, vegetação nativa, campo para pasto, rochedos, riachos, trepadeiras,
                        descampado etc.`
                    },
                ],
                audioContent: []
            }
        }
    },
    {
        id: 2,
        latitude: -7.113377040203341, 
        longitude: -34.88853074539068, 
        marker: {
            title: 'Praça Antenor Navarro', 
            description: 'Ponto turístico da cidade.'
        },
        content: {
            historia: {
                textContent: [
                    {
                        id: 1,
                        author: 'Rodolfo Marques',
                        role: 'Administrador',
                        timestamp: '29/10/2022',
                        content: `Informe as principais pessoas envolvidas com o lugar.
                        O construtor, o proprietário, o responsável pela manutenção, as pessoas que usufruem do
                        espaço, entre outros. Informe quais são os elementos presentes no ambiente natural.
                        As árvores, vegetação nativa, campo para pasto, rochedos, riachos, trepadeiras,
                        descampado etc.`
                    },
                ],
                audioContent: [
                    {}
                ]
            },
            descricao: {
                textContent: [
                    {
                        id: 1,
                        author: 'Rodolfo Marques',
                        role: 'Administrador',
                        timestamp: '29/10/2022',
                        content: `Informe as principais pessoas envolvidas com o lugar.
                        O construtor, o proprietário, o responsável pela manutenção, as pessoas que usufruem do
                        espaço, entre outros. Informe quais são os elementos presentes no ambiente natural.
                        As árvores, vegetação nativa, campo para pasto, rochedos, riachos, trepadeiras,
                        descampado etc.`
                    },
                ],
                audioContent: [
                    {}
                ]
            }
        }
    }
]



export const ComponentContext = createContext()

const Home = () => {

    const [ userLatitude, setUserLatitude ] = useState(-7.119335);
    const [ userLongitude, setUserLongitude ] = useState(-34.823671);
    const [ locations, setLocations ] = useState(inicialPlaces);
    const [ openNewPlaceForm, setOpenNewPlaceForm ] = useState(false);
    const [ openStreetDetails, setOpenStreetDetails ] = useState(false);
    const [ contentSelector, setContentSelector ] = useState('');
    const [ content, setContent ] = useState({})

    useEffect(() => {

        appRoutineLocationStarter(setUserLatitude, setUserLongitude);

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
                <StreetDetails open={ openStreetDetails} setOpen={setOpenStreetDetails} contentSelector={contentSelector} content={content} />
                <SpeedDialButton />
            </MapContainer>
        </ComponentContext.Provider>
    )

    
}

export default Home;