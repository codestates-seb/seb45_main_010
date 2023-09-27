import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAuth, checkAuth } from 'components/Auth/CheckAuth';

type AuthState = {
  isAuthenticated: boolean;
  id: number | null;
  teacher: string | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  id: null,
  teacher: null,
};

export const oAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<{ id: number; teacher: string }>) => {
      state.isAuthenticated = true;
      state.id = action.payload.id;
      state.teacher = action.payload.teacher;
    },
    unauthenficate: (state) => {
      state.isAuthenticated = false;
      state.id = null;
      state.teacher = null;
    },
  },
});

export default oAuthSlice.reducer;
export const { authenticate, unauthenficate } = oAuthSlice.actions;

export const authenticateUser = () => {
  const token = getAuth();

  if (token) {
    const { id, teacher } = checkAuth();
    if (id && teacher) {
      return authenticate({ id, teacher });
    }
  }
  return unauthenficate();
};
