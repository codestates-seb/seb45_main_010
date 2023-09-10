import React, { useState } from 'react';
import { List, ListItem, Typography } from '@material-tailwind/react';
import { AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';

type props = {
  handlerMenu: () => void;
};

const SideMembership = ({ handlerMenu }: props) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handlerLogin = (): void => {
    setIsLogin(!isLogin);
    handlerMenu();
  };

  return (
    <>
      {isLogin ? (
        <List className="grid items-center grid-cols-2 p-4 border-b-2 border-gray-3">
          <ListItem className="flex items-center justify-center">
            <AiOutlineUser className="mr-2 text-xl" />
            <Link to={'/'} onClick={handlerLogin}>
              <Typography className="mt-1" variant="h5" color="blue-gray">
                로그아웃
              </Typography>
            </Link>
          </ListItem>
        </List>
      ) : (
        <List className="grid items-center grid-cols-2 p-4 border-b-2 border-gray-3">
          <ListItem className="flex items-center justify-center">
            <AiOutlineUser className="mr-2 text-xl" />
            <Link to={'/Login'} onClick={handlerMenu}>
              <Typography className="mt-1" variant="h5" color="blue-gray">
                로그인
              </Typography>
            </Link>
          </ListItem>
          <ListItem className="flex justify-center ">
            <AiOutlineUserAdd className="mr-2 text-xl " />
            <Link to={'/Signup'} onClick={handlerMenu}>
              <Typography className="mt-1" variant="h5" color="blue-gray">
                회원가입
              </Typography>
            </Link>
          </ListItem>
        </List>
      )}
    </>
  );
};

export default SideMembership;
