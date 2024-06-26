import './App.css';
import UserTable from './components/TableUser/TableDataUser';
import CreateUserModal from './components/CreateUser/CreateUserModal';
import { useEffect, useState } from 'react';
import { useAppDispatch, useTypedSelector } from './store';
import { setUsers } from './userReducer';
import { getDatos } from './ApiService';

function App() {
  const dispatch = useAppDispatch();
  const users = useTypedSelector(state => state.users.users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getDatos();
        dispatch(setUsers(response.data));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [dispatch]);

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={openModal}
        >
          Nuevo Usuario
        </button>
        <UserTable users={users} />
      </div>
      <CreateUserModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
export default App;