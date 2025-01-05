import { useState, ChangeEvent, FormEvent } from 'react';
import './BannerHip.css';
import axios from 'axios';
import { toast } from 'react-toastify';
const API_URL = "http://localhost:8060/trigonometria/hipotenusa";
const API_URL_PAP = "http://localhost:8060/trigonometria/hipotenusa/passoapasso";

export function BannerHip() {
    const [mostrarResolucao, setMostrarResolucao] = useState(false);
    const [showBanner, setShowBanner] = useState(false);
    const [input, setInput] = useState<string>(''); // Estado para a entrada do usuário
    const [result, setResult] = useState<string>(''); // Estado para armazenar o resultado
    const [resultPaP, setResultPaP] = useState<string>(''); 


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value); 
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Impede o recarregamento da página
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
            {/* hipotenusa */}
            <div className="formula-container">
                <h2>Hipotenusa: h² = a² + b²
                </h2>
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
                    <textarea className="text-area-resolucao" readOnly value={resultPaP ?? ''}/>
                )}
            </div>
            <div className="hipotenusa-page">

                {/* Condicional para exibir o banner se o estado showBanner for true */}
                {showBanner && (
                    <div className="banner">
                        <div className="banner-content">
                            <button className="close-button" onClick={handleCloseBanner}> X </button>
                            <h2>Como Resolver um Triângulo</h2>
                            <br />
                            <div className="txt-banner">
                                <p>
                                    Para calcular a hipotenusa em um triângulo retângulo, usamos o
                                    Teorema de Pitágoras. Essa formula é constituida pelos catetos  "b"  e  "c" ,
                                    e a hipotenusa  "h".
                                </p>
                                <p>h² = a² + b²</p>
                                <p>utilizando de exemplo os dados h² = 3² + 4², deve-se primeiramente calcular
                                    a potencias potencias dos catetos 3 e 4.
                                    Ao multipiclar cada um por si mesmo obtem o resulta 9 e 16.</p>
                                <p>h² = 9 + 16</p>
                                <p>Ao somar os catetos encontrando o numero 25 em sua soma, persebe-se que o outro lado mantem seu expoemte consigo,
                                    para retira-lo é nescessario deixa-lo em raiz quadrada, repetindo para o outro lado da igualdade, retirando o .</p>
                                <p>√h² = √25</p>
                                <p>h = 5</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BannerHip;