
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import UserTable from './components/TableUser/TableDataUser';

function App() {

  const navigate = useNavigate();



  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', gender: 'Male', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', gender: 'Female', status: 'Inactive' },
    // Agrega más usuarios según sea necesario
  ];

  return (

    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
        <UserTable users={users} />
      </div>
    </div>


  );
}



export default App;