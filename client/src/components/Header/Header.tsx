import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

type props = {
  handlerMenu: () => void;
  handlerSearch: () => void;
};

const Header = ({ handlerMenu, handlerSearch }: props) => {
  return (
    <header className="top-0 grid items-center h-12 grid-cols-4 p-1 mb-10 bg-white border-b-2 border-b-gray-2">
      <AiOutlineMenu className="ml-3 text-2xl cursor-pointer text-gray-3" onClick={handlerMenu} />
      <Link to={'/'} className="flex justify-center col-span-2">
        <h1>ConnecT</h1>
      </Link>
      <AiOutlineSearch
        className="col-end-6 mr-3 text-xl cursor-pointer text-gray-3"
        onClick={handlerSearch}
      />
    </header>
  );
};

export default Header;
