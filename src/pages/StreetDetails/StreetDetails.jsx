
import { useRef, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import TextDisplayCard from '../../components/TextDisplayCard/TextDisplayCard';
import AudioDisplayCard from '../../components/AudioDisplayCard/AudioDisplayCard';
import AddContentBar from '../../components/AddContentBar/AddContentBar';
import AudioRecorder from '../../components/AudioRecorder/AudioRecorder';
import TextWriter from '../../components/TextWriter/TextWriter';
import PropTypes from 'prop-types';


const StreetDetails = ({open, setOpen, contentSelector, content}) => {

    const [ openAudioRecorder, setOpenAudioRecorder ] = useState(false);
    const [ openWriter, setOpenWriter] = useState(false);
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
                            {/* <p>
                                Pesquise se o local possui vestígios de ocupações anteriores.
                                Procure por evidências como: pedaços de cerâmicas, pedras lascadas, pedaços de metais,
                                restos de uma antiga roça, ruínas de outras construções, pinturas ou gravuras rupestres,
                                espaços de trabalho como, por exemplo, uma antiga senzala, forno de produção de açúcar,
                                uma fábrica desativada etc.
                            </p>
                            <p>
                                Informar os principais materiais que constituem os elementos do lugar.
                                Esse campo não requer uma observação minuciosa, mas somente a indicação dos
                                principais materiais presentes no lugar. Lá pode haver uma combinação de materiais.
                                Por exemplo: casa de madeira, poste de ferro, muro de pedra, tijolo de barro, caco de
                                vidro, cerca de vareta etc. 
                            </p>
                            <p>
                                Pesquise sobre as técnicas utilizadas para a construção do lugar.
                                Procure descobrir se, para que o lugar se formasse, foram aplicadas técnicas e saberes
                                específicos como, por exemplo: construções de taipa, adobe, alvenaria, pau-a-pique, entre
                                outros; técnicas agrícolas como coivara, curva de nível, agrofloresta e outras.  
                            </p>
                            <p>
                                Informe quais as medidas aproximadas: altura, largura, perímetro da área.
                                Essas dimensões podem ser obtidas com instrumentos técnicos de medição (como fitas
                                métricas, trenas, réguas) ou com estimativas a partir de outras referências criadas pelos
                                estudantes (palmos, passos, pés, altura de uma pessoa adulta, comprimento do braço).
                                Por exemplo: “a igreja tem 10 metros de altura, 15 metros de comprimento”; “a praça
                                possui 30 passos de comprimento e 40 passos de largura”; “a fazenda possui o tamanho de
                                cinco campos de futebol”; “o mastro da bandeira possui a altura de três pessoas em pé”. É
                                interessante, também, solicitar o auxílio do Professor de Matemática sobre o sistema de
                                unidades de medida que melhor atenda às demandas. 
                            </p>
                            <p>
                                Informe as principais atividades realizadas no lugar por pessoas ou grupos.
                                O lugar pode estar relacionado a cultos, celebrações, produção agrícola, produção
                                industrial, atividades escolares, entre outras.
                                Por exemplo: “é nesta praça que acontece a cavalhada”; “nessa cachoeira são realizados
                                ritos em homenagem aos mortos”; “essa caverna é o maior ponto turístico da cidade”.             
                            </p>
                            <p>
                                Identifique os responsáveis e os cuidados necessários para manutenção do lugar.
                                Por exemplo: “a manutenção é realizada pela prefeitura que todos os anos providencia a
                                pintura da fachada da edificação”; “a manutenção é responsabilidade do governo que,
                                periodicamente, corta a grama e limpa o jardim”; “o galpão é mantido pela associação de
                                moradores”; “a roça é mantida pelas mulheres da aldeia”.             
                            </p>
                            <p>
                                Identifique os responsáveis e os cuidados necessários para manutenção do lugar.
                                Por exemplo: “a manutenção é realizada pela prefeitura que todos os anos providencia a
                                pintura da fachada da edificação”; “a manutenção é responsabilidade do governo que,
                                periodicamente, corta a grama e limpa o jardim”; “o galpão é mantido pela associação de
                                moradores”; “a roça é mantida pelas mulheres da aldeia”.             
                            </p>
                            <p>
                                Informe se o lugar está bem ou mal cuidado.
                                Procure saber se as pessoas relacionadas ao lugar consideram que o espaço está bem
                                cuidado. Leve em consideração aspectos como limpeza, partes quebradas, partes que
                                faltam, reformas já feitas.
                                Por exemplo: “o edifício apresenta infiltração no teto e nas paredes e algumas janelas estão
                                quebradas”; “o jardim está bem cuidado”; “a gruta possui pichações por cima das pinturas
                                rupestres”; “a mata está preservada”
                            </p> */}
                        </section>
                    )}
                    {/* <section>
                        <h3>Avaliações</h3>
                        <p>
                            Indique os principais pontos positivos e negativos para que o lugar continue sendo uma referência cultural.
                            Faça um exercício de reflexão em grupo a respeito das informações levantadas nos campos
                            anteriores: as pessoas dão importância ao lugar? Elas se organizam para cuidar do lugar?
                            Como? Ou o lugar está perdendo o significado que justifica sua preservação?
                        </p>
                    </section>
                    <section>
                        <h3>Recomendações</h3>
                        <p>
                            Dê sugestões para a preservação do lugar, após fazer sua avaliação.
                            Aqui, a equipe pode propor possíveis usos sociais e culturais para o lugar. Este é um
                            exercício interessante de patrimonialização. 
                        </p>
                    </section>
                    <section>
                        <h3>Referencias</h3>
                        <p>
                            Lembre-se de anexar a Ficha de Fontes Pesquisadas! Liste os livros, documentos, sites da
                            internet e tudo mais que for consultado durante a pesquisa. Liste também as pessoas que
                            forneceram informações por meio de conversas informais. 
                        </p>
                    </section> */}
                </article>
                <AddContentBar setOpenRecorder={setOpenAudioRecorder} setOpenWriter={setOpenWriter} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Sair</Button>
            </DialogActions>
            <AudioRecorder open={openAudioRecorder} setOpen={setOpenAudioRecorder} contentSelector={contentSelector} />
            <TextWriter open={openWriter} setOpen={setOpenWriter} contentSelector={contentSelector}  />
        </Dialog>
    )

}

export default StreetDetails

StreetDetails.propTypes = {

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