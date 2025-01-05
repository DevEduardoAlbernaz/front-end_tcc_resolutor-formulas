import { useState, ChangeEvent, FormEvent } from 'react';
import './Banners.css';
import axios from 'axios';
import { toast } from 'react-toastify';
const API_URL = "http://localhost:8060/geometriaEspacial/esfera/volume";
const API_URL_PAP = "http://localhost:8060/geometriaEspacial/esfera/volume/passoapasso";

export function BannerVCubo() {
    const [mostrarResolucao, setMostrarResolucao] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [input, setInput] = useState<string>(''); // Estado para a entrada do usuário
    const [result, setResult] = useState<string>(''); // Estado para armazenar o resultado
    const [resultPaP, setResultPaP] = useState<string>(''); 

    // Função para atualizar o valor do input
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
            });  const responsePaP = await axios.get<string>(API_URL_PAP, {
                params: {
                    sintax: input, 
                },
            });
            setResult(response.data);
            setResultPaP(responsePaP.data);
        } catch (error) {
            console.error('Error fetching data:', error); 
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
            <h2>Volume da Esfera: V = π×r³×4÷3</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" className="input-formula" value={input}
                        onChange={(handleInputChange)}
                        placeholder="Inserir o raio(r)" />
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
                    <textarea className="text-area-resolucao" readOnly value={resultPaP ?? ''}/>
                )}
            </div>
            <div className="banner-page">

                {showBanner && (
                    <div className="banner">
                        <div className="banner-content">
                            <button className="close-button" onClick={handleCloseBanner}> X </button>
                            <h2>Como Resolver o volume do Volume do cubo</h2>
                            
                            <br />
                            <div className="txt-banner">
                              <p>A formula da esfera é complexa, mas por outro lado,
                                 para calcula-la basta apenas conhecer o seu raio, sendo o suficiente para desenvolve-la. supondo que o raio é 5 e pi seja = 3,14</p>
                              <p>V = π×r³×4÷3</p>
                              <p>V = π×4³×4÷3</p>
                              <p>V = π×64×4÷3</p>
                              <p>V = π×256÷3</p>
                              <p>V = π×85,33</p>
                              <p>V = 3,14×85,33</p>
                              <p>V = 267,9362</p>
                              <p>obs: todo volume sua medida é denominada em metro cubico, centimetro cubico etc
                                </p>
                                <p>Exemplo: 267,9362m³</p>

                              



                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BannerVCubo;