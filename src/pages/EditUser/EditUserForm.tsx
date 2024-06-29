import { useState } from "react";
import { Gender, Status } from "../../Enums";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../userReducer";
import { putUser } from "../../ApiService";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store";
import { AdjustmentsHorizontalIcon, ArrowUturnLeftIcon, ChevronDownIcon, EnvelopeIcon, PencilSquareIcon, UserIcon, UsersIcon } from "@heroicons/react/24/solid";
import Spinner from "../../components/SpinnerLoadding/Spinner";


interface EditUserProps {
    action: any;
}
const EditUserForm: React.FC<EditUserProps> = ({ action }) => {
    let accion = action;
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
    const [isLoading, setIsLoading] = useState(false);

    const editClic = (user: any) => {
        navigate(`/edit/${user.id}`);
        console.log(`Editar usuario con ID: ${JSON.stringify(user)}`);

    };
    const handleUpdateClick = async () => {
        if (!addName.trim() || !addEmail.trim() || !addGender.trim()) {
            setErrorMessage('Por favor, complete todos los campos.');
            return;
        }
        setIsLoading(true);
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
        setIsLoading(false);
    };
    const handleCancelClick = () => {
        setName('');
        setEmail('');
        setGender(Gender.Male);
        setErrorMessage('');
        navigate('/');
    };
    return (
        <div className="bg-slate-700  p-5  shadow-xl rounded-lg ">
            <div className="flex justify-between items-center mb-4">
                <button
                    type="button"
                    onClick={handleCancelClick}
                    className="inline-flex justify-center ml-5 py-2 px-4 shadow-md text-sm font-medium rounded-md text-white-700 bg-slate-500 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 mr-2">
                    <ArrowUturnLeftIcon className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center mr-5">
                    <h2 className="text-2xl font-bold text-white-700">
                        {accion ? 'Editar Usuario' : 'Ver Usuario'}
                    </h2>
                </div>
            </div>
            {errorMessage && (
                <p className="text-sm text-red-500 mb-4">{errorMessage}</p>
            )}
            <form>
                <div className="p-4 rounded-lg">
                    <div className="relative bg-inherit">
                        <span className="absolute start-0 bottom-3 text-white-500 ">
                            <UserIcon className="w-6 h-6" />
                        </span>
                        <input
                            disabled={!accion}
                            type="text"
                            id="name"
                            value={addName}
                            onChange={(e) => setName(e.target.value)}
                            placeholder=" "
                            className="block py-2.5 ps-8 pe-0 w-full text-base text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-violet-400 peer"
                            required />
                        <label htmlFor="name"
                            className="absolute cursor-text -left-2 -top-3 text-sm text-white-700 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-white-500 peer-placeholder-shown:top-2 peer-placeholder-shown:left-5 peer-focus:-top-3 peer-focus:-left-2 peer-focus:text-white-900 peer-focus:text-sm transition-all ">Nombre:</label>
                    </div>
                </div>
                <div className="p-4 rounded-lg">
                    <div className="relative bg-inherit">
                        <span className="absolute start-0 bottom-3 text-white-500 ">
                            <EnvelopeIcon className="w-6 h-6" />
                        </span>
                        <input
                            disabled={!accion}
                            type="text"
                            id="email"
                            value={addEmail}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder=" "
                            className="block py-2.5 ps-8 pe-0 w-full text-base text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-violet-400 peer"
                            required />
                        <label htmlFor="email"
                            className="absolute cursor-text -left-2 -top-3 text-sm text-white-700 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-white-500 peer-placeholder-shown:top-2 peer-placeholder-shown:left-5 peer-focus:-top-3    peer-focus:-left-2 peer-focus:text-white-900  peer-focus:text-sm transition-all ">
                            Email:</label>
                    </div>
                </div>
                <div className="p-4 rounded-lg">
                    <div className="relative bg-inherit">
                        <span className="absolute start-0 bottom-3 text-white-500 ">
                            <UsersIcon className="w-6 h-6" />
                        </span>
                        <label htmlFor="gender" className="absolute cursor-text -left-2 -top-3 text-sm text-white-700 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-white-500 peer-placeholder-shown:top-2 peer-placeholder-shown:left-5 peer-focus:-top-3    peer-focus:-left-2 peer-focus:text-white-900  peer-focus:text-sm transition-all ">Genero:</label>
                        <select
                            disabled={!accion}
                            id="gender"
                            value={addGender}
                            onChange={(e) => setGender(e.target.value as Gender)} // Asegúrate de castear el valor a Gender
                            className="block py-2.5 ps-8 pe-0 w-full text-base text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-violet-400 peer"
                            required>
                            <option value={Gender.Male}>{Gender.Male}</option>
                            <option value={Gender.Female}>{Gender.Female}</option>
                        </select>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none hover-violet-400">
                            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                        </span>
                    </div>
                </div>
                <div className="p-4 rounded-lg">
                    <div className="relative bg-inherit">
                        <span className="absolute start-0 bottom-3 text-white-500 ">
                            <AdjustmentsHorizontalIcon className="w-6 h-6" />
                        </span>
                        <label htmlFor="status" className="absolute cursor-text -left-2 -top-3 text-sm text-white-700 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-white-500 peer-placeholder-shown:top-2 peer-placeholder-shown:left-5 peer-focus:-top-3    peer-focus:-left-2 peer-focus:text-white-900  peer-focus:text-sm transition-all">Estatus:</label>
                        <select
                            disabled={!accion}
                            id="status"
                            value={addStatus}
                            onChange={(e) => setStatus(e.target.value as Status)} // Asegúrate de castear el valor a Gender
                            className="block py-2.5 ps-8 pe-0 w-full text-base text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-violet-400 peer"
                            required>
                            <option value={Status.Active}>{Status.Active}</option>
                            <option value={Status.Inactive}>{Status.Inactive}</option>
                        </select>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none hover-violet-400">
                            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                        </span>
                    </div>
                </div>
                {accion ? (
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleCancelClick}
                            className="mr-4 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-md text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleUpdateClick}
                            className="mr-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-md text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            {isLoading ? <Spinner /> : "Actualizar"}
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => editClic(user)}
                            className="mr-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-md text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            <PencilSquareIcon className="w-4 h-4" /> Editar
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default EditUserForm;