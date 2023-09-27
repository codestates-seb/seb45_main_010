import { Footer } from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import { Sidebar } from 'components/Menu/Sidebar/Sidebar';
import { Search } from 'components/Menu/Search/Search';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const App = () => {
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const handlerMenu = (): void => setIsMenu(!isMenu);
  const handlerSearch = (): void => setIsSearch(!isSearch);

  return (
    <>
      <main className="">
        <Header handlerMenu={handlerMenu} handlerSearch={handlerSearch} />
        {isMenu && <Sidebar handlerMenu={handlerMenu} />}
        {isSearch && <Search handlerSearch={handlerSearch} />}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
