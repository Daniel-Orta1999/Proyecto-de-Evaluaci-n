
import { UserTableUser } from "../../UserInterface";

interface UserTableProps {
  users: UserTableUser[];
}
const UserTable: React.FC<UserTableProps> = ({ users }) => {

  return (
    <div className="overflow-x-auto">
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
                <button
                  onClick={() => handleEdit(user.id)}
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const handleShow = (id: number) => {
  console.log(`Ver usuario con ID: ${id}`);
};
const handleEdit = (id: number) => {
  console.log(`Editar usuario con ID: ${id}`);
};
const handleDelete = (id: number) => {
  console.log(`Eliminar usuario con ID: ${id}`);
};
export default UserTable;