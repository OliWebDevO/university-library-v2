import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string;
  status: 'pending' | 'approved';
}

const initialState: UserState = {
  id: '',
  status: 'pending', // Default status
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.status = action.payload.status;
    },
    updateStatus: (state, action: PayloadAction<'pending' | 'approved'>) => {
      state.status = action.payload;
    },
  },
});

export const { setUser, updateStatus } = userSlice.actions;
export default userSlice.reducer;