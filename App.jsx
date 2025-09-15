import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';
import LoadingSpinner from './components/common/LoadingSpinner';
import Modal from './components/common/Modal';
import './App.css';

// Componente principal de la aplicación
const App = () => {
  const [count, setCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLoadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      <Header />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 120px)' }}>
        <Sidebar />
        <main className="main-content">
          <h1>StrategyCom Dashboard</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              Count is {count}
            </button>
            <button onClick={handleOpenModal}>Abrir Modal</button>
            <button onClick={handleLoadData}>Simular Carga</button>
            {isLoading && <LoadingSpinner />}
          </div>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <h2>¡Hola desde StrategyCom!</h2>
            <p>Este es un modal de ejemplo.</p>
          </Modal>
        </main>
      </div>
      <Footer />
    </>
  );
};

// Montar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
