import React from 'react';
import { useForm } from 'react-hook-form';

function Exercise07() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    alert(`Nome: ${data.nome}\nEmail: ${data.email}\nTelefone: ${data.telefone}`);
  };

  return (
    <div>
      <h1>Form 7</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nome:</label>
          <input 
            type="text" 
            {...register('nome', { required: 'Nome é obrigatório.' })} 
          />
          {errors.nome && <p>{errors.nome.message}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            {...register('email', { required: 'Email é obrigatório.' })} 
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Telefone:</label>
          <input 
            type="text" 
            {...register('telefone', { 
              required: 'Telefone é obrigatório.',
              pattern: {
                value: /^[0-9]+$/,
                message: 'O telefone deve conter apenas números.'
              }
            })} 
          />
          {errors.telefone && <p>{errors.telefone.message}</p>}
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Exercise07;
