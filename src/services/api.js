//  Mantenha o padrão de aspas e estilização de formatação do código
//  Para facilitar e automatizar isso você pode utilizar o eslint
import axios from 'axios';

const api = axios.create ({
    baseURL: "https://viacep.com.br/ws/"
}); 

// Tente sempre utilizar export ao invés do export default
export default api;