import React from 'react';
import { useForm } from 'react-hook-form';

function Exercise04() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    alert(`Nome: ${data.nome}, Telefone: ${data.telefone}`);
  };

  return (
    <div>
      <h1>Form com react-hook-form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome:</label>
          <input 
            type="text" 
            {...register('nome', { required: 'Nome é obrigatório.' })} 
          />
          {errors.nome && <p style={{ color: 'red' }}>{errors.nome.message}</p>}
        </div>
        <div>
          <label>Telefone:</label>
          <input 
            type="text" 
            {...register('telefone', { 
              required: 'Telefone é obrigatório.',
              validate: value => !isNaN(value) || 'O telefone deve conter apenas números.'
            })} 
          />
          {errors.telefone && <p>{errors.telefone.message}</p>}
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Exercise04;
