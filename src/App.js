// Sempre tente organizar os imports
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';
import api from './services/api';

function App() {
  // Use nomes descritivos, o estado input poderia se chamar "cep" e o input cep poderia se chamar "cepData"
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  // Bom nome de função, e interessante usar esse padrão de handle para uma função que e disparada através
  // de uma ação do usuário, porem tente ser mais específico. Ex: handleSearchCEP
  async function handleSearch(){
    // Você pode simplificar a condição retirando o "=== ''" e deixando apenas if(!input)
    if (input === ''){
      alert("Preencha algum CEP!")
      return;
    } 
    
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
    } catch {
      alert("Ops! erro ao buscar CEP.")
    } finally {
      // Ao em vez de limpar o estado no final do try e do catch limpe o estado no finally
      setInput("")
    }

  }

  // Busque escrever todo o código em inglês, inclusive nome das classes, não apenas as varáveis
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

      {/* Tente utilizar ternário, código fica mis simples e fica mais fácil dar um
          feedback para o usuário caso o cep não seja encontrado, segue o exemplo abaixo
      */}
      {cep.erro ? (
        <main className="resultado">
          <h2> Nenhum CEP Encontrado</h2>
          <span> Tente buscar por outro CEP... </span>
        </main>
      ) : (
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
