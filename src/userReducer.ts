import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserTableUser } from './UserInterface';
//clase para actualizar el estado segun la accion de la tabla
export interface UserState {//es una interfaz que define cómo se verá el estado del slice, en este caso, una lista de usuarios
    users: UserTableUser[];
}
const initialState: UserState = {
    users: [],
};
const userSlice = createSlice({//funciones que definen cómo se debe actualizar el estado en respuesta a una acción específica
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<UserTableUser[]>) {//Actualiza la lista de usuarios con una nueva lista proporcionada en el payload
            state.users = action.payload;
        },
        addUser(state, action: PayloadAction<UserTableUser>) {//Agrega un nuevo usuario a la lista de usuarios
            state.users.push(action.payload);
        },
        removeUser(state, action: PayloadAction<number>) {//Elimina un usuario de la lista (Basado en el id)
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        editUser(state, action: PayloadAction<UserTableUser>) {//Actualiza el estado cuando se edita un usuario (Actualizando de manera inmediata la tabla)
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
    },
});
export const { setUsers, addUser, removeUser, editUser } = userSlice.actions;
export default userSlice.reducer;