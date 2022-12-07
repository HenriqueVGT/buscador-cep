import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if (input === ''){
      alert("Preencha algum CEP!")
      return;
    } try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("Ops! erro ao buscar CEP.")
      setInput("")
    }
  }

  return (
    <div className="conteudo">
      <h1 className="titulo">Consulte o seu CEP</h1>
      <div className="barraPesquisa">
        <input 
          type="text" 
          placeholder="Digite o seu CEP..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
        />
        <button className="botaoBusca" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="resultado">
          <h2> CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>
      )};
      
    </div>
  );
}

export default App;
