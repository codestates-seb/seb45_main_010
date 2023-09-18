import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { handleLogout } from './logoutUtils';

export const Logout = () => {
  const userDetails = useAppSelector((state) => state.member.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogoutClick = () => {
    handleLogout(dispatch);
    navigate('/');
  };
  return (
    <div>
      {userDetails.id && (
        <Button onClick={handleLogoutClick} className="bg-blue-1">
          Logout
        </Button>
      )}
    </div>
  );
};
