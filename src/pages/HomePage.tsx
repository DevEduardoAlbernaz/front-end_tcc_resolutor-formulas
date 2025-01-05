import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

import TriButton from '../components/homePageComponents/TriButton';
import GPButton from '../components/homePageComponents/GPButton';
import GEButton from '../components/homePageComponents/GEButton';


const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h1 className="title">ESCOLHA UMA CATEGORIA:</h1>
      <div className="button-group">
        <TriButton onClick={() => navigate('/trigonometria')} />
        <GPButton onClick={() => navigate('/geometria-plana')} />
        <GEButton onClick={() => navigate('/geometria-espacial')} />
      </div>
    </div>
  );
};
export default HomePage;