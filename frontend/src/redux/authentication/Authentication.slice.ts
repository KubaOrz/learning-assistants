import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthenticationData } from '../../api/dto/authentication/authentication.types';

// Początkowy stan slice'a
const initialState: AuthenticationData | null = null;

// Tworzenie slice'a
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Akcja do ustawiania danych uwierzytelniających
    setAuthenticationData: (state: AuthenticationData | null, action: PayloadAction<AuthenticationData | null>) => {
      return action.payload;
    },
    // Akcja do usuwania danych uwierzytelniających
    clearAuthenticationData(state) {
      return null;
    },
  },
});

// Eksport akcji
export const { setAuthenticationData, clearAuthenticationData } = authSlice.actions;

// Eksport reducer'a
export default authSlice.reducer;
