import { useState } from "react";
import Modal from 'react-modal';

type CreateUserModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const CreateUserModal: React.FC<CreateUserModalProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleCreateClick = () => {
        if (!name.trim() || !email.trim() || !gender.trim()) {
            setErrorMessage('Por favor, complete todos los campos.');
            return;
        }
        // Aquí puedes manejar la lógica para crear el usuario con los datos (nombre, email, genero)
        // Por ejemplo, puedes enviar una solicitud a tu API aquí
        console.log('Creando usuario con:', { name, email, gender });
        onClose();
        setName('');
        setEmail('');
        setGender('');
        setErrorMessage('');
    };
    const handleCancelClick = () => {
        // Simplemente cierra el modal sin hacer ninguna acción
        onClose();
        setName('');
        setEmail('');
        setGender('');
        setErrorMessage('');
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Crear Usuario"
            ariaHideApp={false} // Necesario para evitar errores de accesibilidad
            className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 max-w-md shadow-lg"
            overlayClassName="overlay fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50"
        >
            <div>
                <h2 className="text-2xl font-bold mb-4">Crear Usuario</h2>
                {errorMessage && (
                    <p className="text-sm text-red-500 mb-4">{errorMessage}</p>
                )}
                <form>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Género:</label>
                        <select
                            id="gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        >
                            <option value="">Selecciona</option>
                            <option value="male">Masculino</option>
                            <option value="female">Femenino</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleCancelClick}
                            className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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