import App from 'App';
import DetailPage from 'pages/DetailPage/DetailPage';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import Profile from 'pages/Profile/Profile';
import ListPage from 'pages/ListPage/ListPage';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
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
        element: <Login /> 
      },
      { 
        path: '/SignUp',
        element: <SignUp /> },
    ],
  },
]);
