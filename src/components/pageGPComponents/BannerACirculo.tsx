import { useState, ChangeEvent, FormEvent } from 'react';
import './Banners.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = "http://localhost:8060/geometriaPlana/circulo/area";
const API_URL_PAP = "http://localhost:8060/geometriaPlana/circulo/area/passoapasso";

export function BannerACirculo() {
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
            });
            const responsePaP = await axios.get<string>(API_URL_PAP, {
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
            {/* Área do Círculo */}
            <div className="formula-container">
                <h2>Área do Círculo: A = π×r²</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        className="input-formula" 
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Inserir o raio(r)" 
                    />
                    <input 
                        type="text" 
                        className="input-resposta" 
                        value={result ?? ''}
                        placeholder="Resultado"
                        readOnly 
                    />

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
                    <textarea className="text-area-resolucao" readOnly value={resultPaP ?? ''}/>
                )}
            </div>

            <div className="banner-page">
                {showBanner && (
                    <div className="banner">
                        <div className="banner-content">
                            <button className="close-button" onClick={handleCloseBanner}> X </button>
                            <h2>Como Resolver a área do círculo</h2>
                            <br />
                            <div className="txt-banner">
                                <p>
                                    Para calcular a área de um círculo, deve-se levar em conta qual seu raio,
                                    sendo a metade do seu diâmetro d÷2.
                                    Ao encontrar o raio do círculo você utilizará a fórmula de sua área.
                                </p>
                                <p>A = π×r²</p>
                                <p>Como pode ver além do raio, será necessário o valor de pi(π), 3,14. supondo que o raio é 4, 
                                    ao elevar o raio ao quadrado, você multiplicará
                                    o raio pelo pi e conseguirá o valor da área do círculo. </p>
                                <p>A = π×4²</p>
                                <p>A = 3,14×16</p>
                                <p>A = 50,24</p>
                                <p>obs: todo volume sua medida é denominada em metro por quadrado, centimetro por quadrado etc </p>
                                <p>Exemplo: 50,24m² </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

           
        </div>
    );
};

export default BannerACirculo;