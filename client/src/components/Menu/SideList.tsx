import React from 'react';
import { PresentationChartBarIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

type props = {
  handlerMenu: () => void;
};

const SideList = ({ handlerMenu }: props) => {
  return (
    <>
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
    </>
  );
};

export default SideList;
