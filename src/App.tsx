import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PageGP from './pages/PageGP';
import PageGE from './pages/PageGE';
import PageTri from './pages/PageTri';
import HomePage from './pages/HomePage';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Home: React.FC = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

const PaginaTrigonometria: React.FC = () => (
  <div>
    <PageTri />
  </div>
);

const PaginaGeometriaPlana: React.FC = () => (
  <div>
    <PageGP />
  </div>
);

const PaginaGeometriaEspacial: React.FC = () => (
  <div>
    <PageGE />
  </div>
);

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trigonometria" element={<PaginaTrigonometria />} />
        <Route path="/geometria-plana" element={<PaginaGeometriaPlana />} />
        <Route path="/geometria-espacial" element={<PaginaGeometriaEspacial />} />
      </Routes>
    </Router>
  );
}

export default App;