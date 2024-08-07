import React, { useEffect, useState } from "react";
import { UserTableUser } from "../../UserInterface";
import DeleteUserModal from "../../components/DeleteUser/DeleteUserModal";
import { useNavigate } from "react-router-dom";
import CreateUserModal from "../../components/CreateUser/CreateUserModal";
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, MagnifyingGlassIcon, PencilSquareIcon, PlusIcon, TrashIcon, } from "@heroicons/react/24/solid";
import { useAppDispatch, useTypedSelector } from "../../store";
import { getDatos } from "../../ApiService";
import { setUsers } from "../../userReducer";

const UserTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserTableUser | null>(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleShow = (id: number) => {
    console.log(`Ver usuario con ID: ${id}`);
    navigate(`/user/${id}`);
  };
  const handleEdit = (user: UserTableUser) => {
    navigate(`/edit/${user.id}`);
    console.log(`Editar usuario con ID: ${JSON.stringify(user)}`);
  };
  const [isModalUserOpen, setIsModalUserOpen] = useState(false);
  const dispatch = useAppDispatch();
  const usersTable = useTypedSelector(state => state.users.users);
  const fetchUsers = async (page: number, rowsPerPage: number) => {
    try {
      const response = await getDatos(page, rowsPerPage);
      dispatch(setUsers(response.data));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  useEffect(() => {
    fetchUsers(page, rowsPerPage);
  }, [page, rowsPerPage]);

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

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
    console.log(newPage);
    fetchUsers(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event);
    setRowsPerPage(parseInt(event.target.value));
    console.log(rowsPerPage);
    setPage(1);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = usersTable.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuarios</h1>
      <div className="pb-3 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={handleSearch}
            className="bg-slate-900 px-3 py-2 pl-8 border border-slate-300 shadow-md rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-red" />
          <MagnifyingGlassIcon className="absolute top-1/2 left-2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
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
                    ${user.status === "active" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"
                    }`}>
                  {user.status}
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
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <span className="mr-2">Registros por página:</span>
          <select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="border border-gray-300 rounded p-1">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </div>
        <div >
          <button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 1}
            className="p-1 border border-transparent shadow-md text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <ChevronLeftIcon className="w-5 h-5 " />
          </button>
          <span className="mx-2">
            Página {page}
          </span>
          <button
            onClick={() => handleChangePage(page + 1)}
            className="p-1 border border-transparent shadow-md text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <ChevronRightIcon className="w-5 h-5 " />
          </button>
        </div>
      </div>
      <DeleteUserModal isOpen={isModalOpen} onClose={closeModal} user={userToDelete} />
      <CreateUserModal isOpen={isModalUserOpen} onClose={closeUserModal} />
    </div>
  );
};

export default UserTable;
