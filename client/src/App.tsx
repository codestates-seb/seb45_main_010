import Header from 'components/Header/Header';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <main className="h-screen ">
      <Header />
      <Outlet />
    </main>
  );
};

export default App;
