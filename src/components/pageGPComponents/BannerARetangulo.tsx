import { useState, ChangeEvent, FormEvent } from 'react';
import './Banners.css';
import axios from 'axios';
import { toast } from 'react-toastify';
const API_URL = "http://localhost:8060/geometriaPlana/paralelepipedo/area";
const API_URL_PAP = "http://localhost:8060/geometriaPlana/paralelepipedo/area/passoapasso";

export function BannerARetangulo() {
    const [mostrarResolucaoRetangulo, setMostrarResolucaoRetangulo] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [input, setInput] = useState<string>(''); // Estado para a entrada do usuário
    const [result, setResult] = useState<string>(''); // Estado para armazenar o resultado
    const [resultPaP, setResultPaP] = useState<string>(''); 

    // Função para atualizar o valor do input
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value); // Atualiza o estado com o valor do campo
    };

    // Função chamada ao enviar o formulário
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
                    sintax: input, // Envia a expressão como parâmetro
                },
            });  const responsePaP = await axios.get<string>(API_URL_PAP, {
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
        setMostrarResolucaoRetangulo(!mostrarResolucaoRetangulo);
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
            <h2>Área do Retangulo: A = b×h</h2>
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

                {mostrarResolucaoRetangulo && (
                    <textarea className="text-area-resolucao" readOnly value={resultPaP ?? ''}/>
                )}
            </div>
            <div className="banner-page">

                {/* Condicional para exibir o banner se o estado showBanner for true */}
                {showBanner && (
                    <div className="banner">
                        <div className="banner-content">
                            <button className="close-button" onClick={handleCloseBanner}> X </button>
                            <h2>Como Resolver a área do triangulo</h2>
                            <br />
                            <div className="txt-banner">
                               <p>O retangulo é contituido pela sua largura e altura, e para descobrir sua área irá apenas 
                                multiplicar esses dois valores, sendo b a base e "h" a altura</p>
                               <p>por exemplo, b=5 e h=12</p>
                               <p>A = 5×12</p>
                               <p>A = 60</p>
                               <p>obs: todo volume sua medida é denominada em metro por quadrado, centimetro por quadrado etc 
                         </p>
                      <p>Exemplo: 60m² </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BannerARetangulo;