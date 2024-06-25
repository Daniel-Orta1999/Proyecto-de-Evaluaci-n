import { useState } from "react";
import Modal from 'react-modal';
import { Gender} from "../../Enums";


type CreateUserModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const CreateUserModal: React.FC<CreateUserModalProps> = ({ isOpen, onClose }) => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState<Gender>(Gender.Male);
    const [errorMessage, setErrorMessage] = useState('');


    const handleCreateClick = () => {
        if (!name.trim() || !email.trim() || !gender.trim()) {
            setErrorMessage('Por favor, complete todos los campos.');
            return;
        }
        
        
        onClose();
        setName('');
        setEmail('');
        setGender(Gender.Male);
        setErrorMessage('');
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
            className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#0F1035] rounded-lg p-6 max-w-md shadow-lg"
            overlayClassName="overlay fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50"
        >
            <div>
                <h2 className="text-2xl font-bold mb-4">Crear Usuario</h2>
                {errorMessage && (
                    <p className="text-sm text-red-500 mb-4">{errorMessage}</p>
                )}
                <form>
                    <div className=" p-4 rounded-lg">
                        <div className="relative bg-tra">
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                                placeholder="Nombre:"
                                required
                            />
                            <label htmlFor="name" className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">Nombre:</label>
                        </div>
                    </div>
                    <div className=" p-4 rounded-lg">
                        <div className="relative bg-inherit">
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                                placeholder="Email:"
                                required
                            />
                            <label htmlFor="email" className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all">Email:</label>
                        </div>
                    </div>
                    <div className="mb-4 mx-2 px-2">
                        <label htmlFor="gender" className="block  font-medium text-gray-700  cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit   peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm">Género:</label>
                        <select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value as Gender)} // Asegúrate de castear el valor a Gender
                            className="peer bg-transparent h-10 w-72 rounded-lg text-gray-200 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-sky-600 focus:outline-none focus:border-rose-600"
                            required
                        >
                            <option value={Gender.Male}>{Gender.Male}</option>
                            <option value={Gender.Female}>{Gender.Female}</option>

                        </select>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleCancelClick}
                            className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleCreateClick}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Crear
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default CreateUserModal;