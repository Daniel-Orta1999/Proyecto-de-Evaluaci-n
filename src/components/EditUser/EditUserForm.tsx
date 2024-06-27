import { useState } from "react";
import { Gender, Status } from "../../Enums";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../userReducer";
import { putUser } from "../../ApiService";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const EditUserForm: React.FC = () => {
    const { id } = useParams<{ id: any }>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state: RootState) => state.users.users);
    const user = users.find((u) => u.id === Number(id));
    const [addName, setName] = useState(user?.name || '');
    const [addEmail, setEmail] = useState(user?.email || '');
    const [addGender, setGender] = useState<Gender>(user?.gender || Gender.Male);
    const [addStatus, setStatus] = useState<Status>(user?.status || Status.Active);
    const [errorMessage, setErrorMessage] = useState('');
    const handleUpdateClick = async () => {
        if (!addName.trim() || !addEmail.trim() || !addGender.trim()) {
            setErrorMessage('Por favor, complete todos los campos.');
            return;
        }
        const formData = {
            name: addName.trim(),
            email: addEmail.trim(),
            gender: addGender,
            status: addStatus,
        };
        const data = await putUser(formData, id);
        console.log("data", data);
        dispatch(editUser(data));
        setName('');
        setEmail('');
        setGender(Gender.Male);
        setErrorMessage('');
        navigate('/');
    };
    const handleCancelClick = () => {
        setName('');
        setEmail('');
        setGender(Gender.Male);
        setErrorMessage('');
        navigate('/');
    };
    return (
        <div className=" top-1/4 left-1/2  -translate-x-1/2 -translate-y-1/2 bg-white  p-5  shadow-lg rounded-lg">
            <div className=" justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-700">Crear Usuario</h2>
            </div>
            <button
                type="button"
                onClick={handleCancelClick}
                className="mr-2 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                <ArrowLeftIcon className="w-4 h-4" />
            </button>
            {errorMessage && (
                <p className="text-sm text-red-500 mb-4">{errorMessage}</p>
            )}
            <form>
                <div className="bg-white p-4 rounded-lg">
                    <div className="relative bg-inherit">
                        <input
                            type="text"
                            id="name"
                            value={addName}
                            onChange={(e) => setName(e.target.value)}
                            className="peer bg-transparent h-10 w-72 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-300 focus:ring-violet-400 focus:outline-none focus:border-rose-600"
                            placeholder="Nombre"
                            required />
                        <label htmlFor="name"
                            className="absolute cursor-text left-0 -top-3 text-sm text-gray-700 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-gray-900 peer-focus:text-sm transition-all">Nombre:</label>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                    <div className="relative bg-inherit">
                        <input
                            type="text"
                            id="email"
                            value={addEmail}
                            onChange={(e) => setEmail(e.target.value)}
                            className="peer bg-transparent h-10 w-72 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-300 focus:ring-violet-400 focus:outline-none focus:border-rose-600"
                            placeholder="Nombre"
                            required />
                        <label htmlFor="email"
                            className="absolute cursor-text left-0 -top-3 text-sm text-gray-700 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-gray-900 peer-focus:text-sm transition-all">Email:</label>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                    <div className="relative bg-inherit">
                        <label htmlFor="gender" className="absolute cursor-text left-0 -top-3 text-bg text-gray-700 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-gray-900 peer-focus:text-sm transition-all">Genero:</label>
                        <select
                            id="gender"
                            value={addGender}
                            onChange={(e) => setGender(e.target.value as Gender)} // Asegúrate de castear el valor a Gender
                            className="peer bg-transparent h-10 w-72 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-300 focus:ring-violet-400 focus:outline-none focus:border-rose-600"
                            required>

                            <option value={Gender.Male}>{Gender.Male}</option>
                            <option value={Gender.Female}>{Gender.Female}</option>
                        </select>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                    <div className="relative bg-inherit">
                        <label htmlFor="status" className="absolute cursor-text left-0 -top-3 text-bg text-gray-700 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-gray-900 peer-focus:text-sm transition-all">Estatus:</label>
                        <select
                            id="status"
                            value={addStatus}
                            onChange={(e) => setStatus(e.target.value as Status)} // Asegúrate de castear el valor a Gender
                            className="peer bg-transparent h-10 w-72 rounded-lg text-gray-500 placeholder-transparent ring-2 px-2 ring-gray-300 focus:ring-violet-400 focus:outline-none focus:border-rose-600"
                            required>
                            <option value={Status.Active}>{Status.Active}</option>
                            <option value={Status.Inactive}>{Status.Inactive}</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleCancelClick}
                        className="mr-2 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleUpdateClick}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Actualizar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditUserForm;