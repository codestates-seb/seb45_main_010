import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';

type props = {
  handlerMenu: () => void;
  handlerSearch: () => void;
};

const Header = ({ handlerMenu, handlerSearch }: props) => {
  return (

    <header className="sticky top-0 grid items-center h-12 grid-cols-3 p-1 mb-10 bg-white border-b-2  border-b-grey-2">
      <AiOutlineMenu className="ml-3 text-2xl cursor-pointer text-grey-3 " onClick={handlerMenu} />
      <p className="col-span-2">'임시(서비스명)'</p>
      <AiOutlineSearch
        className="col-end-5 mr-3 text-2xl cursor-pointer text-grey-3 "
        onClick={handlerSearch}
      />
    </header>
  );
};

export default Header;
