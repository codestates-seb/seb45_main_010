import { Card, Typography, List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import { PresentationChartBarIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';

type props = {
  handlerMenu: () => void;
};

export const Sidebar = ({ handlerMenu }: props) => {
  return (
    <>
      <div
        className="absolute top-0 w-[375px] h-screen bg-black bg-opacity-10 "
        onClick={handlerMenu}
      ></div>
      <Card className="w-[350px] p-1 shadow-xl  top-0 absolute">
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
        <List>
          <Link to={'/'} onClick={handlerMenu}>
            <ListItem>
              <ListItemPrefix>
                <PresentationChartBarIcon className="w-5 h-5" />
              </ListItemPrefix>
              강사 목록
            </ListItem>
          </Link>
          <Link to={'/Profile'} onClick={handlerMenu}>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="w-5 h-5" />
              </ListItemPrefix>
              내 정보
            </ListItem>
          </Link>
        </List>
      </Card>
    </>
  );
};
