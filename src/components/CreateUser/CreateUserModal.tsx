import { useState } from "react";
import Modal from 'react-modal';
import { Gender, Status } from "../../Enums";
import { ChevronDownIcon, EnvelopeIcon, UserIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/solid';
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
            className="modal fixed top-1/4 left-1/2  -translate-x-1/2 -translate-y-1/2 bg-slate-700 p-5 shadow-xl rounded-lg w-1/4"
            overlayClassName="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50">
            <div>
                <div className="flex justify-between items-center pb-3">
                    <div className="flex items-center">
                        <span className="p-2 bg-green-100 rounded-full shadow-md">
                            <UserPlusIcon className="w-6 h-6 text-green-600" />
                        </span>
                    </div>
                    <button onClick={onClose} className="bg-transparent  text-gray-400 py-1 px-1 rounded-5 hover:bg-slate-500 hover:shadow-md">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <h2 className="text-xl font-bold text-white-700 pb-3">Crear Usuario</h2>
                <h2 className="text-l text-white-700 pb-2 pb-1">Agregue los campos solicitados.</h2>
                {errorMessage && (
                    <p className="text-sm text-red-500 ">{errorMessage}</p>
                )}

                <form>
                    <div className="p-4 rounded-lg">
                        <div className="relative bg-inherit">
                            <span className="absolute start-0 bottom-3 text-white-500 ">
                                <UserIcon className="w-6 h-6" />
                            </span>
                            <input
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
                            <label htmlFor="gender" className="absolute cursor-text -left-2 -top-3 text-sm text-white-700 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-white-500 peer-placeholder-shown:top-2 peer-placeholder-shown:left-5 peer-focus:-top-3    peer-focus:-left-2 peer-focus:text-white-900  peer-focus:text-sm transition-all ">Género:</label>
                            <select
                                id="gender"
                                value={addGender}
                                onChange={(e) => setGender(e.target.value as Gender)}
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
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleCancelClick}
                            className="mr-2 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-md text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleCreateClick}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-md text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">

                            {isLoading ? <Spinner /> : "Crear"}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default CreateUserModal;