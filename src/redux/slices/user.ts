import { User } from '@/typings/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState = {
  user: { name: null, avatar: null, email: null, id: null } as User,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
