import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import DataTable from 'react-data-table-component';

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

function Exercise13() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [dados, setDados] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, 'formularios'), data);
      alert('Dados salvos com sucesso!');
      fetchDados();
      setSelectedRow(null);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      alert('Erro ao salvar dados.');
    }
  };

  const fetchDados = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'formularios'));
      const dadosList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDados(dadosList);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleRowSelected = (row) => {
    setSelectedRow(row);
    setValue('nome', row.nome);
    setValue('email', row.email);
    setValue('telefone', row.telefone);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'formularios', id));
      alert('Registro excluído com sucesso!');
      fetchDados();
    } catch (error) {
      console.error('Erro ao excluir registro:', error);
      alert('Erro ao excluir registro.');
    }
  };

  useEffect(() => {
    fetchDados();
  }, []);

  const columns = [
    {
      name: 'Nome',
      selector: row => row.nome,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Telefone',
      selector: row => row.telefone,
      sortable: true,
    },
    {
      name: 'Ações',
      cell: row => (
        <button onClick={() => handleDelete(row.id)}>Excluir</button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
  ];

  return (
    <div>
      <h1>Form com Firestore e react DataTable</h1>
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
          {errors.telefone && <p>{errors.telefone.message}</p>}
        </div>
        <button type="submit">Enviar</button>
      </form>
      <h2>Dados Gravados:</h2>
      <DataTable
        columns={columns}
        data={dados}
        pagination
        onRowClicked={handleRowSelected}
      />
    </div>
  );
}

export default Exercise13;
