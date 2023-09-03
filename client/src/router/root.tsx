import App from 'App';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import ListPage from 'pages/ListPage/ListPage';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [{ path: '/list', element: <ListPage /> }],
  },
]);
