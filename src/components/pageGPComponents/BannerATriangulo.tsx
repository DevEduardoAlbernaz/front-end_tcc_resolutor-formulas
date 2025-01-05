import { useState, ChangeEvent, FormEvent } from 'react';
import './Banners.css';
import axios from 'axios';
import { toast } from 'react-toastify';
const API_URL = "http://localhost:8060/geometriaPlana/triangulo/area";
const API_URL_PAP = "http://localhost:8060/geometriaPlana/triangulo/area/passoapasso";

export function BannerATriangulo() {
    const [mostrarResolucaotriangulo, setMostrarResolucaoTriangulo] = useState(false);
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
                    sintax: input, // Envia a expressão como parâmetro
                },
            });
            setResult(response.data);
            setResultPaP(responsePaP.data);// Atualiza o estado com o resultado retornado
        } catch (error) {
            console.error('Error fetching data:', error); // Log do erro
        }
    };

    const handleToggleChange = () => {
        setMostrarResolucaoTriangulo(!mostrarResolucaotriangulo);
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
                <h2>Área do Triangulo: A = b×h÷2</h2>

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

                {mostrarResolucaotriangulo && (
                    <textarea className="text-area-resolucao" readOnly value={resultPaP ?? ''} />
                )}
            </div>
            <div className="banner-page">

                {/* Condicional para exibir o banner se o estado showBanner for true */}
                {showBanner && (
                    <div className="banner">
                        <div className="banner-content">
                            <button className="close-button" onClick={handleCloseBanner}> X </button>
                            <h2>Como Resolver a Área de um triangulo</h2>
                            <br />
                            <div className="txt-banner">
                                <p>O triangulo nada mais é que um retangulo pela metade,
                                    ou seja a formula do retangulo dividido por 2, sendo:</p>
                                <p>A = b×h÷2</p>
                                <p>utilizara a base do triangulo vezes a altura do triangulo, 
                                    supondo que  triangulo seja de base 3 e altura 4</p>
                                <p>A = 3×4÷2</p>
                                <p>ao multiplicar voce conseguiria uma area inteira de um retangulo,
                                     ao dividir por 2 descubrirá a area do triangulo.</p>
                                <p>A = 12÷2</p>
                                <p>A = 6</p>
                                <p>obs: todo volume sua medida é denominada em metro por quadrado, centimetro por quadrado etc 
                         </p>
                      <p>Exemplo: 6m² </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BannerATriangulo;