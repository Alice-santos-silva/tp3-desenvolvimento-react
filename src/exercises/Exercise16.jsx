import React, { useState } from 'react';
import axios from 'axios';

function Exercise16() {
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setCep(event.target.value);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEndereco(null);
    
    if (!cep || !/^[0-9]{5}-?[0-9]{3}$/.test(cep)) {
      setError('Formato de CEP inválido. Use 00000-000 ou 00000000.');
      return;
    }
    
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setError('CEP não encontrado.');
        setEndereco(null);
      } else {
        setEndereco(response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
      setError('Erro ao buscar o endereço. Verifique o CEP e tente novamente.');
      setEndereco(null);
    }
  };

  return (
    <div>
      <h1>Buscar Endereço pelo CEP</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>CEP:</label>
          <input 
            type="text" 
            value={cep}
            onChange={handleChange}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <button type="submit">Buscar</button>
      </form>

      {endereco && (
        <div>
          <h2>Endereço Encontrado:</h2>
          <p><strong>Logradouro:</strong> {endereco.logradouro}</p>
          <p><strong>Bairro:</strong> {endereco.bairro}</p>
          <p><strong>Cidade:</strong> {endereco.localidade}</p>
          <p><strong>Estado:</strong> {endereco.uf}</p>
          <p><strong>CEP:</strong> {endereco.cep}</p>
        </div>
      )}
    </div>
  );
}

export default Exercise16;
