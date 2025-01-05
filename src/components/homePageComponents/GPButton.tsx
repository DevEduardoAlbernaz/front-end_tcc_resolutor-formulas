import React from 'react';
import './GPButton.css';
import GeometriaPlanaImage from '../assets/gei.png';
interface GeometriaPlanaButtonProps {
  onClick: () => void;
}

const GPButton: React.FC<GeometriaPlanaButtonProps> = ({ onClick }) => {
  return (
    <button className="category-button" onClick={onClick}>
      <img src={GeometriaPlanaImage} alt="Geometria Plana" />
      <p>GEOMETRIA<br />PLANA</p>
    </button>
  );
}

export default GPButton;