import React from 'react';
import { useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
const auth = getAuth(app);

function Exercise15() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.senha);
      alert('Login bem-sucedido!');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            {...register('email', { required: 'Email é obrigatório.' })} 
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>
        <div>
          <label>Senha:</label>
          <input 
            type="password" 
            {...register('senha', { required: 'Senha é obrigatória.' })} 
          />
          {errors.senha && <p style={{ color: 'red' }}>{errors.senha.message}</p>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Exercise15;
