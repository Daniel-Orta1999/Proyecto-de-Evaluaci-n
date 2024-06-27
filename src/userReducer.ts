import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserTableUser } from './UserInterface';


export interface UserState {
    users: UserTableUser[];
}
const initialState: UserState = {
    users: [],
};
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<UserTableUser[]>) {
            state.users = action.payload;
        },
        addUser(state, action: PayloadAction<UserTableUser>) {
            state.users.push(action.payload);
        },
        removeUser(state, action: PayloadAction<number>) {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        editUser(state, action: PayloadAction<UserTableUser>) {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
    },
});
export const { setUsers, addUser, removeUser, editUser } = userSlice.actions;
export default userSlice.reducer;