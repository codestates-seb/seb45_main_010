import Header from 'components/Header/Header';
import { Sidebar } from 'components/Menu/Sidebar';
import { useState } from 'react';

const App = () => {
  const [isMenu, setIsMenu] = useState<boolean>(false);

  const handlerMenu = (): void => {
    setIsMenu(!isMenu);
  };

  return (
    <main className="h-screen ">
      {isMenu && (
        <div
          className="absolute top-0 w-[375px] h-screen bg-black bg-opacity-10"
          onClick={handlerMenu}
        ></div>
      )}
      <Header handlerMenu={handlerMenu} />
      {isMenu && <Sidebar />}
    </main>
  );
};

export default App;
