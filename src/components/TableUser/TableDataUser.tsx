import React, { useEffect, useState } from "react";
import { UserTableUser } from "../../UserInterface";
import DeleteUserModal from "../DeleteUser/DeleteUserModal";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import CreateUserModal from "../CreateUser/CreateUserModal";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useTypedSelector } from "../../store";
import { getDatos } from "../../ApiService";
import { setUsers } from "../../userReducer";

const UserTable: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserTableUser | null>(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getDatos(page, rowsPerPage );
        dispatch(setUsers(response.data));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [dispatch, page, rowsPerPage]);

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
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event);
    setRowsPerPage(parseInt(event.target.value));
    console.log(rowsPerPage);
    setPage(0);
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
          {usersTable.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
            <tr key={user.id} className="hover:bg-gray-100 text-black">
              <td className="py-2 px-4 border-b text-center">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.gender}</td>
              <td className="py-2 px-4 border-b">{user.status}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleShow(user.id)} className="bg-transparent text-blue-600 py-1 px-2 rounded hover:bg-gray-200">
                  <EyeIcon className="w-4 h-4" />
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

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <span className="mr-2">Rows per page:</span>
          <select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            className="border border-gray-300 rounded p-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
        </div>
        <div>
          <button
            onClick={() => handleChangePage(0)}
            disabled={page === 0}
            className="p-1"
          >
            {"<<"}
          </button>
          <button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
            className="p-1"
          >
            {"<"}
          </button>
          <span className="mx-2">
            Page {page + 1} of {Math.ceil(usersTable.length / rowsPerPage)}
          </span>
          <button
            onClick={() => handleChangePage(page + 1)}
            disabled={page >= Math.ceil(usersTable.length / rowsPerPage) - 1}
            className="p-1"
          >
            {">"}
          </button>
          <button
            onClick={() => handleChangePage(Math.max(0, Math.ceil(usersTable.length / rowsPerPage) - 1))}
            disabled={page >= Math.ceil(usersTable.length / rowsPerPage) - 1}
            className="p-1"
          >
            {">>"}
          </button>
        </div>
      </div>

      <DeleteUserModal isOpen={isModalOpen} onClose={closeModal} user={userToDelete} />
      <CreateUserModal isOpen={isModalUserOpen} onClose={closeUserModal} />
    </div>
  );
};

export default UserTable;
