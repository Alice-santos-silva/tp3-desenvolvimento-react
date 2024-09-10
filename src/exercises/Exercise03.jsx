import React, { useState } from 'react';

function Exercise03() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [erro, setErro] = useState('');

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleTelefoneChange = (event) => {
    setTelefone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    
    if (!nome || !telefone) {
      setErro('Nome e Telefone são obrigatórios.');
    } else if (isNaN(telefone)) {
      setErro('O telefone deve conter apenas números.');
    } else {
      setErro('');
      console.log(`Nome: ${nome}, Telefone: ${telefone}`);
    }
  };

  return (
    <div>
      <h1>Form 3</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input 
            type="text" 
            value={nome} 
            onChange={handleNomeChange} 
            required 
          />
        </div>
        <div>
          <label>Telefone:</label>
          <input 
            type="text" 
            value={telefone} 
            onChange={handleTelefoneChange} 
            required 
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
      {erro && <p>{erro}</p>}
    </div>
  );
}

export default Exercise03;
