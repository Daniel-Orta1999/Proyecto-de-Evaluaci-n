import './App.css';
import { useEffect } from 'react';
import { useAppDispatch, useTypedSelector } from './store';
import { setUsers } from './userReducer';
import { getDatos } from './ApiService';
import { Route, Routes } from 'react-router-dom';
import EditUserForm from './components/EditUser/EditUserForm';
import TableDataUser from './components/TableUser/TableDataUser';

function App() {
  const dispatch = useAppDispatch();
  const users = useTypedSelector(state => state.users.users);

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
        <Routes>
          <Route path="/" element={<TableDataUser users={users} />} />
          <Route path="/edit/:id" element={<EditUserForm action={true} />} />
          <Route path="/user/:id" element={<EditUserForm action={false} />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;