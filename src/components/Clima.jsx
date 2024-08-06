import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../App.css';



const traducoes = {
  "clear sky": "céu limpo",
  "few clouds": "poucas nuvens",
  "scattered clouds": "nuvens dispersas",
  "broken clouds": "nuvens quebradas",
  "shower rain": "chuva passageira",
  "rain": "chuva",
  "thunderstorm": "trovoada",
  "snow": "neve",
  "mist": "névoa",
  // Adicione mais traduções conforme necessário
};

const Clima = () => {
  const [clima, setClima] = useState(null);
  const [cidade, setCidade] = useState('Sao Paulo'); // Valor inicial da cidade
  const [entradaCidade, setEntradaCidade] = useState('');
  const [erro, setErro] = useState(null);
  const apiKey = 'de650ea8c0b9bde2b889cd4180f9cda1'; 

  const buscarClima = () => {
    console.log(`Buscando dados para a cidade: ${cidade}`);
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`)
      .then(response => {
        console.log('Resposta da API:', response.data);
        setClima(response.data);
        setErro(null); // Limpa o erro se a requisição for bem-sucedida
      })
      .catch(error => {
        console.error('Erro na busca:', error);
        setErro('Não foi possível buscar os dados do clima.');
        setClima(null); // Limpa os dados do clima em caso de erro
      });
  };

  useEffect(() => {
    buscarClima();
  }, [cidade]);

  const handleInputChange = (event) => {
    setEntradaCidade(event.target.value);
  };

  const handleSearchClick = () => {
    setCidade(entradaCidade);
  };

  return (
    <div>
      <input
        type="text"
        value={entradaCidade}
        onChange={handleInputChange}
        placeholder="Digite o nome da cidade"
      />
      <button onClick={handleSearchClick}>Buscar</button>
      {erro && <div>{erro}</div>}
      {clima ? (
        <div>
          <h3>Cidade: {cidade}</h3>
          <p>Temperatura: {clima.main.temp} °C</p>
          <p>Condição: {traducoes[clima.weather[0].description] || clima.weather[0].description}</p>
        </div>
      ) : (
        !erro && <div>Carregando...</div>
      )}
    </div>
  );

};

export default Clima;



