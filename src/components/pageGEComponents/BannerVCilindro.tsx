import { useState, ChangeEvent, FormEvent } from 'react';
import './Banners.css';
import axios from 'axios';
const API_URL = "http://localhost:8060/geometriaEspacial/cilindro/volume";
const API_URL_PAP = "http://localhost:8060/geometriaEspacial/cilindro/volume/passoapasso";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function BannnerVCilindro() {
    const [mostrarResolucao, setMostrarResolucao] = useState(false);
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
            e.preventDefault(); // Impede o recarregamento da página
        
            // Validação para verificar se o campo está vazio ou não contém números
            if (!input.trim() || !/\d/.test(input)) {
              toast.error("Preencha o campo corretamente.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
              });
              return; // Impede o envio se a validação falhar
            }
        
            try {
              // Envia a requisição GET para a API
              const response = await axios.get<string>(API_URL, {
                params: {
                  sintax: input, // Envia a expressão como parâmetro
                },
              });
        
              const responsePaP = await axios.get<string>(API_URL_PAP, {
                params: {
                  sintax: input, // Envia a expressão como parâmetro
                },
              });
        
              setResult(response.data);
              setResultPaP(responsePaP.data); // Atualiza o estado com o resultado retornado
            } catch (error) {
              console.error("Erro ao buscar os dados:", error); // Log do erro
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
            {/* Volume do cilindro */}
            <div className="formula-container">

                <h2>Volume do Cilindro: V = π×r²×h</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" className="input-formula" value={input}
                        onChange={(handleInputChange)}
                        placeholder="Inserir fórmula" />
                    <input type="text" className="input-resposta" value={result ?? ''}
                        placeholder="Resultado"
                        readOnly />

                    <div className="botoes">

                        <button className="botao-aprender"  type='button' onClick={handleLearnClick}>APRENDER</button>
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
                            <h2>Como Resolver o volume do cilindro</h2>
                            <br />
                            <div className="txt-banner">
                                <p>O volume do cilindro nada mais é que a multiplicação da area do circulo com a altura
                                    do cilindro(h), a formula:</p>
                                <p>V = π×r²×h</p>
                                <p>A dormula consiste da multiplicação do raio elevador ao Quadrado multiplicado pela altura.</p>
                                <p>supondo que π= 3,14 r=3 e h=12</p>
                                <p>V = π×3²×12</p>
                                <p> V = π×9×12</p>
                                <p>V = 3,14×108</p>
                                <p>V = 339,12</p>
                                <p>obs: todo volume sua medida é denominada em metro cubico, centimetro cubico etc
                                </p>
                                <p>Exemplo: 339,12m³</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BannnerVCilindro;