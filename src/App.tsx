import './App.css';
import { Route, Routes } from 'react-router-dom';
import EditUserForm from './pages/EditUser/EditUserForm';
import TableDataUser from './pages/TableUser/TableDataUser';

function App() {
  return (
    <div>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<TableDataUser />} />
          <Route path="/edit/:id" element={<EditUserForm action={true} />} />
          <Route path="/user/:id" element={<EditUserForm action={false} />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;