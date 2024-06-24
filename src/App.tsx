
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import UserTable from './components/TableUser/TableDataUser';
import CreateUserModal from './components/CreateUser/CreateUserModal';
import { useState } from 'react';

function App() {

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);



  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', gender: 'Male', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', gender: 'Female', status: 'Inactive' },
    // Agrega más usuarios según sea necesario
  ];
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
        {/* Botón para abrir el modal */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={openModal}>
          Nuevo Usuario
        </button>

        {/* Tabla de usuarios */}
        <UserTable users={users} />
      </div>

      {/* Modal de creación de usuario */}
      <CreateUserModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;