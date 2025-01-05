import React from 'react';
import './TriButton.css';
import TrianguloImage from '../assets/hba.png'; // Importa a imagem

interface TrigButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // Função opcional de clique
}

const TriButton: React.FC<TrigButtonProps> = ({ onClick }) => {
  return (
    <button className="category-button" onClick={onClick}>
      <img src={TrianguloImage} alt="Trigonometria" />
      <p>TRIGONOMETRIA</p>
    </button>
  );
}

export default TriButton;