import { useState, ChangeEvent, FormEvent } from 'react';
import './Banners.css';
import axios from 'axios';
import { toast } from 'react-toastify';
const API_URL = "http://localhost:8060/geometriaEspacial/paralelepipedoRetangular/volume";
const API_URL_PAP = "http://localhost:8060/geometriaEspacial/paralelepipedoRetangular/volume/passoapasso";

export function BannerVparalelepipedo() {
    const [mostrarResolucao, setMostrarResolucao] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [input, setInput] = useState<string>(''); // Estado para a entrada do usuário
    const [result, setResult] = useState<string>(''); // Estado para armazenar o resultado
    const [resultPaP, setResultPaP] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value); 
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        if (!input.trim() || !/\d/.test(input)) {
            toast.error("Preencha o campo corretamente.", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
            });
            return; 
          }
        try {
            const response = await axios.get<string>(API_URL, {
                params: {
                    sintax: input, 
                },
            }); const responsePaP = await axios.get<string>(API_URL_PAP, {
                params: {
                    sintax: input, 
                },
            });
            setResult(response.data);
            setResultPaP(responsePaP.data);
        } catch (error) {
            console.error('Error fetching data:', error); // Log do erro
        }
    };

    const handleToggleChange = () => {
        setMostrarResolucao(!mostrarResolucao);
    };
    const handleLearnClick = () => {
        setShowBanner(true);
    };
    const handleCloseBanner = () => {
        setShowBanner(false);
    };

    return (

        <div className="setores-formulas">
            {/* Volume do paralelepipedoRetangular */}
            <div className="formula-container">
                <h2>Volume do paralelepípedo retângulo: V = a×b×c</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" className="input-formula" value={input}
                        onChange={(handleInputChange)}
                        placeholder="Inserir fórmula" />
                    <input type="text" className="input-resposta" value={result ?? ''}
                        placeholder="Resultado"
                        readOnly />

                    <div className="botoes">
                        <button className="botao-aprender" type='button' onClick={handleLearnClick}>APRENDER</button>
                        <button className="botao-calcular" type='submit'>calcular</button>

                    </div>
                </form>
                <div className="switch-container">
                    <span>MOSTRAR RESOLUÇÃO:</span>
                    <label className="switch">
                        <input type="checkbox" onChange={handleToggleChange} />
                        <span className="slider"></span>
                    </label>
                </div>

                {mostrarResolucao && (
                    <textarea className="text-area-resolucao" readOnly value={resultPaP ?? ''} />
                )}
            </div>
            <div className="banner-page">

                {showBanner && (
                    <div className="banner">
                        <div className="banner-content">
                            <button className="close-button" onClick={handleCloseBanner}> X </button>
                            <h2>Como Resolver o volume do Volume do paralelepípedo retângulo</h2>

                            <br />
                            <div className="txt-banner">
                                <p>O volume do paralelepípedo retângulo nada mais é que a
                                    formula da area do retangulo adicionando uma largura na figura, sendo a formula:</p>
                                <p>V = a×b×c</p>
                                <p>assim como a área do retangulo, multiplica-se tudo um pelo outro. supondo que a=5, b=3,c=6</p>
                                <p>V = 5×3×6</p>
                                <p>V = 15×6</p>
                                <p>V = 90</p>
                                <p>obs: todo volume sua medida é denominada em metro cubico, centimetro cubico etc
                                </p>
                                <p>Exemplo: 90m³</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BannerVparalelepipedo;