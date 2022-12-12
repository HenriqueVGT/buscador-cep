import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import api from './services/api';

import './styles.css';

export function App() {

  const [cep, setCep] = useState('');
  const [cepData, setCepData] = useState({});

  async function handleSearch(){
    if (!cep){
      alert('Preencha algum CEP!');
      return;
    } 
    
    try {
      const response = await api.get(`${cep}/json`);
      setCepData(response.data);
    } 
    
    catch {
      alert('Ops! erro ao buscar CEP.');
    }

    finally {
      setCep('');
    }
  }

  return (
    <div className='container'>
      <h1 className='title'>Consulte o seu CEP</h1>
      <div className='searchBar'>
        <input 
          type='text' 
          placeholder='Digite o seu CEP...' 
          value={cepData} 
          onChange={(e) => setCepData(e.target.value)} 
        />
        <button className="searchButton" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {cep.erro ? (
        <main className="searchResult">
          <h2> CEP não encontrado! </h2>
          <span> Tente novamente... </span>
        </main>
      ) : (
        <main className="searchResult">
          <h2> CEP: {cepData.cep}</h2>
          <span>{cepData.logradouro}</span>
          <span>Complemento: {cepData.complemento}</span>
          <span>{cepData.bairro}</span>
          <span>{cepData.localidade} - {cepData.uf}</span>
        </main>
      )};
      
    </div>
  );
};

