import React, { useEffect } from 'react';
import { toast } from "react-toastify";
import './PageGP.css';
import { useNavigate } from 'react-router-dom';
import BannerACirculo from '../components/pageGPComponents/BannerACirculo';
import BannerAQuadrado from '../components/pageGPComponents/BannerAQuadrado';
import BannerATriangulo from '../components/pageGPComponents/BannerATriangulo';
import BannerATrapezio from '../components/pageGPComponents/BannerATrapezio';
import BannerARetangulo from '../components/pageGPComponents/BannerARetangulo';


const PageGP: React.FC = () => {
    const navigate = useNavigate();

    const handleVoltarClick = () => {
        navigate('/'); 
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
        <div className="geometria-plana">
            <div className="header">
                <button className="botao-voltar" onClick={handleVoltarClick}>voltar</button>
                <h1>GEOMETRIA PLANA</h1>
            </div>
            <div className="setores-formulas">
                {/* Fórmula do Círculo */}
                <div>
                    <BannerACirculo />
                </div>
                {/* Fórmula do Quadrado */}
                <div>
                    <BannerAQuadrado />
                </div>
                {/* Fórmula do Triangulo */}
                <div>
                    <BannerATriangulo />
                </div>
            </div>
            <div className="setor-formulas2">
                {/* Fórmula do Trapezio */}
                <div>
                    <BannerATrapezio />
                </div>
                {/* Fórmula do Retangulo */}
                <BannerARetangulo />
            </div>
        </div>
    );
};

export default PageGP;