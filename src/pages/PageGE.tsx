import React, { useEffect } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './PageGE.css';
import { useNavigate } from 'react-router-dom';
import BannnerVCilindro from '../components/pageGEComponents/BannerVCilindro';
import BannerVparalelepipedo from '../components/pageGEComponents/BannerVparalelepipedo';
import BannerVCubo from '../components/pageGEComponents/BannerVCubo';
import BannerVEsfera from '../components/pageGEComponents/BannerVEsfera';

const PageGE: React.FC = () => {
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

    const navigate = useNavigate();
    
    const handleVoltarClick = () => {
        navigate('/'); 
    };

    return (
        <div className="geometria-espacial">
            <div className="header">
                <button className="botao-voltar" onClick={handleVoltarClick}>voltar</button>
                <h1>GEOMETRIA ESPACIAL</h1>
            </div>
            <div className="setores-formulas">
                {/* Fórmula volume do cilindro */}
                <div>
                    <BannnerVCilindro />
                </div>

                {/* Fórmula do paralelepípedo retângulo */}
                <div>
                    <BannerVparalelepipedo />
                </div>

                {/* Fórmula do Cubo */}
                <div>
                    <BannerVCubo />
                </div>
            </div>
            <div className="setor-formulas2">
                {/* Fórmula do Esfera */}
                <div>
                    <BannerVEsfera />
                </div>
            </div>
        </div>
    );
};

export default PageGE;