import { useState, ChangeEvent, FormEvent } from 'react';
import './Banners.css';
import axios from 'axios';
import { toast } from 'react-toastify';
const API_URL = "http://localhost:8060/geometriaPlana/trapezio/area";
const API_URL_PAP = "http://localhost:8060/geometriaPlana/trapezio/area/passoapasso";

export function BannerAQuadrado() {
    const [mostrarResolucaoTrapezio, setMostrarResolucaoTrapezio] = useState(false);
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
            // Envia a requisição GET para a API
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
        setMostrarResolucaoTrapezio(!mostrarResolucaoTrapezio);
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
            <h2>Área do Trapezio: A = (B+b)h÷2</h2>
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

                {mostrarResolucaoTrapezio && (
                    <textarea className="text-area-resolucao" readOnly value={resultPaP ?? ''}/>
                )}
            </div>
            <div className="banner-page">

                {/* Condicional para exibir o banner se o estado showBanner for true */}
                {showBanner && (
                    <div className="banner">
                        <div className="banner-content">
                            <button className="close-button" onClick={handleCloseBanner}> X </button>
                            <h2>Como Resolver a área do Trapezio</h2>
                            <br />
                            <div className="txt-banner">
                                <p>A formula do trapezeio desenvolve-se apartir da soma da base maior e a base menor:</p>
                               <p>A = (B+b)h÷2</p>
                               <p>Ao somar as bases das linhas paralelas, multiplicará pela altura do trapezio, e ;ogo após dividirá por 2, obtendo assim o resultado. 
                                supondo que B=6 b=2 h=4.
                               </p>
                               <p>A = (6+2)4÷2</p>
                            <p>V = 3,14×108</p>
                               <p>A = 8×4÷2</p>
                               <p>A = 32÷2</p>
                               <p>A = 16</p>
                               <p>obs: todo volume sua medida é denominada em metro por quadrado, centimetro por quadrado etc 
                         </p>
                      <p>Exemplo: 16m² </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BannerAQuadrado;