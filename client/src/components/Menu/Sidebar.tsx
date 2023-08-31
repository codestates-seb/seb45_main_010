import { Card, Typography, List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import { PresentationChartBarIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { AiOutlineUser, AiOutlineUserAdd } from 'react-icons/ai';

export const Sidebar = () => {
  return (
    <Card className="w-[350px] p-1 shadow-xl  top-0 absolute">
      <List className="grid items-center grid-cols-2 p-4 border-b-2 border-grey-3">
        <ListItem className="flex items-center justify-center">
          <AiOutlineUser className="mr-2 text-2xl" />
          <Typography className="mt-1" variant="h5" color="blue-gray">
            로그인
          </Typography>
        </ListItem>
        <ListItem className="flex justify-center ">
          <AiOutlineUserAdd className="mr-2 text-2xl " />
          <Typography className="mt-1" variant="h5" color="blue-gray">
            회원가입
          </Typography>
        </ListItem>
      </List>
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="w-5 h-5" />
          </ListItemPrefix>
          강사 목록
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="w-5 h-5" />
          </ListItemPrefix>
          내 정보
        </ListItem>
      </List>
    </Card>
  );
};
