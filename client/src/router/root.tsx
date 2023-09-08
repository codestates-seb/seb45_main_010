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
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/detail',
        element: <DetailPage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signUp',
        element: <SignUp />,
      },
      {
        path: '/private',
        element: <Private />,
      },
      {
        path: '/getpassword',
        element: <GetPassword />,
      },
    ],
  },
]);
