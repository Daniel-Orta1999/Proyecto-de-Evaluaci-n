import { useState } from "react";
import Modal from 'react-modal';
import { Gender, Status } from "../../Enums";
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useDispatch } from "react-redux";
import { addUser } from "../../userReducer";
import { postUser } from "../../ApiService";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import Spinner from "../SpinnerLoadding/Spinner";

type CreateUserModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const CreateUserModal: React.FC<CreateUserModalProps> = ({ isOpen, onClose }) => {

    const dispatch = useDispatch();
    const [addName, setName] = useState('');
    const [addEmail, setEmail] = useState('');
    const [addGender, setGender] = useState<Gender>(Gender.Male);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleCreateClick = async () => {
        if (!addName.trim() || !addEmail.trim() || !addGender.trim()) {
            setErrorMessage('Por favor, complete todos los campos.');
            return;
        }
        setIsLoading(true);
        const formData = {
            name: addName.trim(),
            email: addEmail.trim(),
            gender: addGender,
            status: Status.Active,
        };
        const data = await postUser(formData);
        console.log("data", data);
        dispatch(addUser(data));
        setName('');
        setEmail('');
        setGender(Gender.Male);
        setErrorMessage('');
        onClose();
        setIsLoading(false);
    };
    const handleCancelClick = () => {
        onClose();
        setName('');
        setEmail('');
        setGender(Gender.Male);
        setErrorMessage('');
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Crear Usuario"
            ariaHideApp={false}
            className="modal fixed top-1/4 left-1/2  -translate-x-1/2 -translate-y-1/2 bg-white  p-5  shadow-lg rounded-lg"
            overlayClassName=" fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-40">
            <div>
                
            
                <div className="flex justify-between items-center pb-3">
                    <div className="flex items-center">
                        <span className="p-2 bg-green-100 rounded-full">
                            <UserPlusIcon className="w-6 h-6 text-green-600" />
                        </span>
                    </div>
                    <button onClick={onClose} className="bg-transparent  text-gray-400 py-1 px-1 rounded-5 hover:bg-gray-200">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                
                    <h2 className="text-xl font-bold text-gray-700 pb-3">Crear Usuario</h2>
                    <h2 className="text-l text-gray-400 pb-5 pb-1">Agregue los campos solicitados.</h2>
                
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
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleCancelClick}
                            className="mr-2 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleCreateClick}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            
                            {isLoading ? <Spinner /> : "Crear"}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default CreateUserModal;