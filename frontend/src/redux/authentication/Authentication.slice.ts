import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthenticationData } from '../../api/dto/authentication/authentication.types';

type AuthState = {
  authData: AuthenticationData | null;
}

const initialState: AuthState = {
  authData: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticationData: (state: AuthState, action: PayloadAction<AuthenticationData>) => {
      sessionStorage.setItem('las_auth', JSON.stringify(action.payload));
      state.authData = action.payload
    },
    clearAuthenticationData(state: AuthState) {
      sessionStorage.removeItem('las_auth');
      state.authData = null
    },
  },
});

export const { setAuthenticationData, clearAuthenticationData } = authSlice.actions;

export default authSlice.reducer;
