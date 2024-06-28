import Modal from 'react-modal';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { removeUser } from "../../userReducer";
import { deleteUser } from "../../ApiService";
import { UserTableUser } from "../../UserInterface";

type DeleteUserModalProps = {
    isOpen: boolean;
    onClose: () => void;
    user: UserTableUser | null;
};

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, onClose, user }) => {

    const dispatch = useDispatch();
    const handleDeleteClick = async () => {
        if (!user) return;
        const data = await deleteUser(user.id);
        if (data == 204) {
            console.log("se borro loko")
        }
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
            className="modal fixed top-1/4 left-1/2  -translate-x-1/2 -translate-y-1/2 bg-white  p-5  shadow-lg rounded-lg "
            overlayClassName=" fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-40">

            <div>
                <div className="flex justify-between items-center pb-3">
                    <div className="flex items-center">
                        <span className="p-2 bg-red-100 rounded-full">
                            <TrashIcon className="w-6 h-6 text-red-600" />
                        </span>
                    </div>
                    <button onClick={onClose} className="bg-transparent  text-gray-400 py-1 px-1 rounded-5 hover:bg-gray-200">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-600">Eliminar Usuario: {user?.id}</h2>

                </div>
                <div>
                    <h2 className="text-l text-gray-400 pb-5 ">¿Estas seguro que deseas eliminar al usuario: {user?.name}?</h2>
                </div>
                <form>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleCancelClick}
                            className="mr-2 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300">
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleDeleteClick}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Eliminar
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default DeleteUserModal;
