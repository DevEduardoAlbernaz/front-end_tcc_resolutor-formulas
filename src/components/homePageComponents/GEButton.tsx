import React from 'react';
import './GEButton.css';
import GeometriaEspacialImage from '../assets/gespacialI.png';

interface GeometriaEspacialButtonProps {
  onClick: () => void;
}

const GEButton: React.FC<GeometriaEspacialButtonProps> = ({ onClick }) => {
  return (
    <button className="category-button" onClick={onClick}>
      <img src={GeometriaEspacialImage} alt="Geometria Espacial" />
      <p>GEOMETRIA<br />ESPACIAL</p>
    </button>
  );
}

export default GEButton;