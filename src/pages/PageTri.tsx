import './PageTri.css';
import { BannerHip } from '../components/pageTriComponents/BannerHip';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
function PageTri() {   
    const navigate = useNavigate(); // Criando o hook de navegação
    const handleVoltarClick = () => {
        navigate('/'); // Redireciona para a página principal
    };
    useEffect(() => {
      
        toast.info("Atenção ao que é solicitado em cada fórmula!", {
          position: "top-right",   
          autoClose: 3000,         
          hideProgressBar: false,  
          closeOnClick: true,    
          pauseOnHover: false,    
          draggable: true,         
        });
      }, []); 
    return (
        <div className="trigonometria">
            <button className="botao-voltar" onClick={handleVoltarClick}>voltar</button>
            <h1>Trigonometria</h1>
            <div className="setores-formulas">
                {/* Fórmula volume do cilindrFo */}
                <BannerHip/>
            </div>
        </div>
    );
};

export default PageTri;