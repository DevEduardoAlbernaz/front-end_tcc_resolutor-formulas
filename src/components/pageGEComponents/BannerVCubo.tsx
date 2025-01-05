import { useState, ChangeEvent, FormEvent } from 'react';
import './Banners.css';
import axios from 'axios';
const API_URL = "http://localhost:8060/geometriaEspacial/cubo/volume";
const API_URL_PAP = "http://localhost:8060/geometriaEspacial/cubo/volume/passoapasso";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export function BannerVCubo() {
  const [mostrarResolucao, setMostrarResolucao] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [input, setInput] = useState<string>(''); // Estado para a entrada do usuário
  const [result, setResult] = useState<string>(''); // Estado para armazenar o resultado
  const [resultPaP, setResultPaP] = useState<string>(''); 

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value); // Atualiza o estado com o valor do campo
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
      console.error("Erro ao buscar os dados:", error); 

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
      <div className="formula-container">
        <h2>Volume do Cubo: V = l³</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            className="input-formula" 
            value={input} 
            onChange={handleInputChange} 
            placeholder="Inserir o lado(l)" 
          />
          <input 
            type="text" 
            className="input-resposta" 
            value={result ?? ''} 
            placeholder="Resultado" 
            readOnly 
          />
          <div className="botoes">
            <button className="botao-aprender" type="button" onClick={handleLearnClick}>APRENDER</button>
            <button className="botao-calcular" type="submit" >calcular</button>

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
              <h2>Como Resolver o volume do cubo</h2>
              <br />
              <div className="txt-banner">
                <p>A fórmula do volume do cubo é semelhante ao da área do quadrado, sendo l elevado ao cubo, ou seja, a×a×a.</p>
                <p>V = a³</p>
                <p>Supondo que a = 3:</p>
                <p>V = 3³</p>
                <p>V = 3×3×3</p>
                <p>V = 9×3</p>
                <p>V = 27</p>
                <p>Obs: Todo volume tem sua medida denominada em metro cúbico, centímetro cúbico, etc.</p>
                <p>Exemplo: 27m³</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannerVCubo;