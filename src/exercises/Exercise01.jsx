import React, { useState } from 'react';

function Exercise01() {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleTelefoneChange = (event) => {
    setTelefone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Nome: ${nome}, Telefone: ${telefone}`);
  };

  return (
    <div>
      <h1>Formulário Simples</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={handleNomeChange} />
        </div>
        <div>
          <label>Telefone:</label>
          <input type="text" value={telefone} onChange={handleTelefoneChange} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Exercise01;
