import Modal from 'react-modal';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { removeUser } from "../../userReducer";
import { deleteUser } from "../../ApiService";
import { UserTableUser } from "../../UserInterface";
import { useState } from 'react';
import Spinner from '../SpinnerLoadding/Spinner';

type DeleteUserModalProps = {
    isOpen: boolean;
    onClose: () => void;
    user: UserTableUser | null;
};

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, onClose, user }) => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteClick = async () => {
        if (!user) return;
        setIsLoading(true);
        const data = await deleteUser(user.id);
        if (data == 204) {
        }
        setIsLoading(false);
        dispatch(removeUser(user.id));
        console.log("data", data);
        onClose();
    };
    const handleCancelClick = () => {
        onClose();
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
                        <span className="p-2 bg-red-100 rounded-full shadow-md ">
                            <TrashIcon className="w-6 h-6 text-red-600" />
                        </span>
                    </div>
                    <button onClick={onClose} className="bg-transparent  text-gray-400 py-1 px-1 rounded-5 hover:bg-slate-500 hover:shadow-md">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <p>
                        <span className='text-xl font-bold text-white-700 pb-5 '>Eliminar Usuario:</span>
                        <span className='text-xl text-white-100'>{" " + user?.id}</span>
                    </p>
                </div>
                <div>
                    <p className="text-l text-white-700 pb-5 ">¿Estás seguro que deseas eliminar al usuario:
                        <span className='font-bold text-white-100'>
                            {" " + user?.name}
                        </span>?
                    </p>
                </div>
                <form>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleCancelClick}
                            className="mr-2 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-md text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleDeleteClick}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-md text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            {isLoading ? <Spinner /> : "Eliminar"}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default DeleteUserModal;