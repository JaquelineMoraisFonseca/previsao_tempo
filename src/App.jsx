// src/App.jsx


import CloudsBackground from './components/CloudsBackground';
import Clima from './components/Clima';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <CloudsBackground />
      <div className="app">
        <h1>Previsão do Tempo</h1>
        <div>
          <Clima />
        </div>
      </div>
    </div>
  );
};

export default App;

