import React, { useEffect, useState } from "react";
import { UserTableUser } from "../../UserInterface";
import DeleteUserModal from "../../components/DeleteUser/DeleteUserModal";
import { useNavigate } from "react-router-dom";
import CreateUserModal from "../../components/CreateUser/CreateUserModal";
import { EyeIcon, PencilSquareIcon, PlusIcon, TrashIcon, } from "@heroicons/react/24/solid";
import { useAppDispatch, useTypedSelector } from "../../store";
import { getDatos } from "../../ApiService";
import { setUsers } from "../../userReducer";

const UserTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserTableUser | null>(null);
  const navigate = useNavigate();
  const handleShow = (id: number) => {
    navigate(`/user/${id}`);//Navega al apartado de ver usuario y se actualiza la URL de la pagina
  };
  const handleEdit = (user: UserTableUser) => {
    navigate(`/edit/${user.id}`);//Navega al modal de editar y se actualiza la URL de la pagina
  };
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);
  const dispatch = useAppDispatch();
  const usersTable = useTypedSelector(state => state.users.users);

  const fetchUsers = async () => {//Funcion para sincronizar usuarios
    try {
      const response = await getDatos();//variable que almacena la respuesta de la apiService
      dispatch(setUsers(response));//Accion que actualiza los datos en la tabla
    } catch (error) {
    }
  };

  useEffect(() => {//Funcion que se ejecuta cada vez que se muestra o se actualiza la pagina
    fetchUsers();
  },);

  const openUserModal = () => {
    setIsModalUserOpen(true);
  };

  const closeUserModal = () => {
    setIsModalUserOpen(false);
  };

  const openModal = (user: UserTableUser) => {//Abre modal para eliminar el usuario seleccionado
    setUserToDelete(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setUserToDelete(null);
    setIsModalOpen(false);
  };

  const filteredData = usersTable//Filtro para mostrar ascendentemente los usuarios conforme al id
    .filter((item) => item.id !== undefined && item.id !== null)
    .sort((a, b) => a.id - b.id);
  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      <div className="pb-3 flex justify-between items-center">
        <button
          type="button"
          onClick={openUserModal}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-md text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <PlusIcon className="w-5 h-5 mr-1" /> Nuevo Usuario
        </button>
      </div>
      <table className="min-w-full bg-slate-700 border border-none rounded-md shadow-lg">
        <thead className="bg-slate-800 text-white ">
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
          {filteredData.slice().map((user) => (
            <tr key={user.id} className="hover:bg-slate-500 text-white">
              <td className="py-2 px-4  text-center">{user.id}</td>
              <td className="py-2 px-4 ">{user.name}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4 ">{user.gender}</td>
              <td className="py-2 px-4">
                <span
                  className={`inline-flex items-center px-2 py-1  rounded-full text-xs font-semibold 
                    ${user.status ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
                    }`}>
                  {user.status ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td className="py-2 px-4  text-center">
                <button
                  onClick={() => handleShow(user.id)} className="bg-transparent text-blue-500 py-1 px-2 rounded hover:bg-slate-400">
                  <EyeIcon className="w-4 h-4" />
                </button>
                <button onClick={() => handleEdit(user)} className="bg-transparent text-violet-500 py-1 px-2 rounded hover:bg-slate-400">
                  <PencilSquareIcon className="w-4 h-4" />
                </button>
                <button onClick={() => openModal(user)} className="bg-transparent text-red-500 py-1 px-2 rounded hover:bg-slate-400">
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
