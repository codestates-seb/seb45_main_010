import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { handleLogout } from './logoutUtils';
import { RootState } from 'redux/store';

export const Logout = () => {
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
  const isDisabled = !isAuthenticated;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogoutClick = () => {
    handleLogout(dispatch);
    navigate('/');
  };
  return (
    <div>
      <Button onClick={handleLogoutClick} disabled={isDisabled} className="bg-blue-1">
        Logout
      </Button>
    </div>
  );
};
