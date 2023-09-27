import { Card } from '@material-tailwind/react';
import SideList from './SideList';
import SideMembership from './SideMembership';

type props = {
  handlerMenu: () => void;
};

export const Sidebar = ({ handlerMenu }: props) => {
  return (
    <>
      <div
        className="absolute top-0 z-[999] w-full h-full bg-black bg-opacity-10 backdrop-blur-sm"
        onClick={handlerMenu}
      ></div>
      <Card className="w-[350px] p-2 shadow-xl top-3 mt-8 mx-3 absolute z-[999]">
        <SideMembership handlerMenu={handlerMenu} />
        <SideList handlerMenu={handlerMenu} />
      </Card>
    </>
  );
};
