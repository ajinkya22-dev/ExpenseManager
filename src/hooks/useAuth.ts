import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { loginStart, loginSuccess, loginFailure, logout } from '@/store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

  const login = async (email: string, password: string) => {
    dispatch(loginStart());
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        id: '1',
        email,
        name: email.split('@')[0],
        username: email.split('@')[0].toLowerCase(),
      };
      
      dispatch(loginSuccess(userData));
      return { success: true };
    } catch (error) {
      dispatch(loginFailure());
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (email: string, password: string, name: string) => {
    dispatch(loginStart());
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: '1',
        email,
        name,
        username: email.split('@')[0].toLowerCase(),
      };
      
      dispatch(loginSuccess(userData));
      return { success: true };
    } catch (error) {
      dispatch(loginFailure());
      return { success: false, error: 'Registration failed' };
    }
  };

  const signOut = () => {
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    signOut,
  };
};