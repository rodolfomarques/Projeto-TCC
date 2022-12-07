
import { useRef, useEffect, useContext } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ComponentContext } from '../Home/Home';
import TextDisplayCard from '../../components/TextDisplayCard/TextDisplayCard';
import AudioDisplayCard from '../../components/AudioDisplayCard/AudioDisplayCard';
import AddContentBar from '../../components/AddContentBar/AddContentBar';
import AudioRecorder from '../../components/AudioRecorder/AudioRecorder';
import TextWriter from '../../components/TextWriter/TextWriter';
import PropTypes from 'prop-types';


const StreetDetails = ({open, setOpen, contentSelector, content, placeID}) => {

    const {openAudioRecorder, setOpenAudioRecorder, openWriter, setOpenWriter } = useContext(ComponentContext);
    const handleClose = () => { setOpen(false); };
    const descriptionElementRef = useRef(null);
    
    useEffect(() => {
    if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
        descriptionElement.focus();
        }
    }
    }, [open])

 

    return (

        <Dialog
            open={open}
            onClose={handleClose}
            scroll={'paper'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">Busto de Tamandaré</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <article>
                    {/* galeria de imagens */}
                    {/* Lembre-se de colocar título/assunto, a data, o local, a autoria de cada imagem. */}

                    {contentSelector === 'historia' && (
                        <section>
                            <h3>História</h3>
                            {
                                content.historia.textContent.map((text, i) => {
                                    return (
                                        <TextDisplayCard 
                                            key={`card-${i}`} 
                                            autor={text.author} 
                                            texto={text.content} 
                                            category={text.category} 
                                            papel={text.role} 
                                            timestamp={text.timestamp} 
                                        />
                                    )
                                })
                            }
                            {
                                content.historia.audioContent.map((audio, i) => {
                                    return (
                                        <AudioDisplayCard 
                                            key={`card-${i}`} 
                                            autor={audio.author} 
                                            audio={audio.content} 
                                            category={audio.category} 
                                            papel={audio.role} 
                                            timestamp={audio.timestamp} 
                                        />
                                    )
                                })
                            }
                        </section>
                    )}

                    {contentSelector === 'descricao' && (
                        <section>
                            <h3>Descrição</h3>
                            {
                                content.descricao.textContent.map((text, i) => {
                                    return (<TextDisplayCard key={`card-${i}`} autor={text.author} texto={text.content} category={text.category} papel={text.role} timestamp={text.timestamp} />)
                                })
                            }
                            {
                                content.descricao.audioContent.map((audio, i) => {
                                    return (<AudioDisplayCard key={`card-${i}`} autor={audio.author} audio={audio.content} category={audio.category} papel={audio.role} timestamp={audio.timestamp} />)
                                })
                            }
                        </section>
                    )}
                </article>
                <AddContentBar setOpenRecorder={setOpenAudioRecorder} setOpenWriter={setOpenWriter} setOpenDetails={setOpen}  />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Sair</Button>
            </DialogActions>
            
        </Dialog>
    )

}

export default StreetDetails

StreetDetails.propTypes = {

    placeID: PropTypes.string,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    contentSelector: PropTypes.string,
    content: {
        historia: {
            textContent: PropTypes.array,
            audioContent: PropTypes.array
        },
        descricao: {
            textContent: PropTypes.array,
            audioContent: PropTypes.array
        }
    }

}