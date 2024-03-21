// types
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {}
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
    },
    logoutUser(state, action){
      state.user = {}
    }
  }
});

export default user.reducer;

export const { loginUser, logoutUser } = user.actions;
