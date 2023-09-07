import App from 'App';
import DetailPage from 'pages/DetailPage/DetailPage';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import GetPassword from 'pages/GetPassword';
import ListPage from 'pages/ListPage/ListPage';
import Login from 'pages/Login';
import Private from 'pages/Private';
import Profile from 'pages/Profile/Profile';
import SignUp from 'pages/SignUp';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ListPage />,
      },
      {
        path: '/Profile',
        element: <Profile />,
      },
      {
        path: '/Detail',
        element: <DetailPage />,
      },
      {
        path: '/Login',
        element: <Login />,
      },
      {
        path: '/SignUp',
        element: <SignUp />,
      },
      {
        path: '/Private',
        element: <Private />,
      },
      {
        path: '/GetPassword',
        element: <GetPassword />,
      },
    ],
  },
]);
