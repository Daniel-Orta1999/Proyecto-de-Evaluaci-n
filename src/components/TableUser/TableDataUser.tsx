
import { useState } from "react";
import { UserTableUser } from "../../UserInterface";
import DeleteUserModal from "../DeleteUser/DeleteUserModal";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import CreateUserModal from "../CreateUser/CreateUserModal";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

interface UserTableProps {
  users: UserTableUser[];
}
const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserTableUser | null>(null);
  const navigate = useNavigate();

  const handleShow = (id: number) => {
    console.log(`Ver usuario con ID: ${id}`);
  };
  const handleEdit = (user: UserTableUser) => {
    navigate(`/edit/${user.id}`);
    console.log(`Editar usuario con ID: ${JSON.stringify(user)}`);

  };
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);

  const openUserModal = () => {
    setIsModalUserOpen(true);
  };
  const closeUserModal = () => {
    setIsModalUserOpen(false);
  };
  const openModal = (user: UserTableUser) => {
    setUserToDelete(user);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setUserToDelete(null);
    setIsModalOpen(false);
  };
  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={openUserModal}>
        Nuevo Usuario
      </button>

      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50 text-black">
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Género</th>
            <th className="py-2 px-4 border-b">Estatus</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100 text-black">
              <td className="py-2 px-4 border-b text-center">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.gender}</td>
              <td className="py-2 px-4 border-b">{user.status}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleShow(user.id)}
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 mr-2"
                >
                  Ver
                </button>
                <button onClick={() => handleEdit(user)} className="bg-transparent text-violet-600 py-1 px-2 rounded hover:bg-gray-200">
                  <PencilSquareIcon className="w-4 h-4" />
                </button>
                <button onClick={() => openModal(user)} className="bg-transparent text-red-600 py-1 px-2 rounded hover:bg-gray-200">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteUserModal isOpen={isModalOpen} onClose={closeModal} user={userToDelete} />
      <CreateUserModal isOpen={isModalUserOpen} onClose={closeUserModal} />
    </div>
  );
};
export default UserTable;