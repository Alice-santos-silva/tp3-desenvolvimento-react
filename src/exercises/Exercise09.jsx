import React from 'react';
import { useForm } from 'react-hook-form';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCm-lbbOSQWx5WsaEUlRlxCXnw9pZcYBog",
    authDomain: "projeto4-f35e8.firebaseapp.com",
    projectId: "projeto4-f35e8",
    storageBucket: "projeto4-f35e8.appspot.com",
    messagingSenderId: "251229101400",
    appId: "1:251229101400:web:bb84fe963288e08508192d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Exercise09() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, 'formularios'), data);
      alert('Dados salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      alert('Erro ao salvar dados.');
    }
  };

  return (
    <div>
      <h1>Form com Firestore</h1>
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
          <label>Email:</label>
          <input 
            type="text" 
            {...register('email', { 
              required: 'Email é obrigatório.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email inválido.'
              }
            })} 
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
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
          {errors.telefone && <p style={{ color: 'red' }}>{errors.telefone.message}</p>}
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Exercise09;
