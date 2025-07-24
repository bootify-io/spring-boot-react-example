import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import App from "./app";
import Home from './home/home';
import FlowerList from './flower/flower-list';
import FlowerAdd from './flower/flower-add';
import FlowerEdit from './flower/flower-edit';
import Error from './error/error';


export default function AppRoutes() {
  const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        { path: '', element: <Home /> },
        { path: 'flowers', element: <FlowerList /> },
        { path: 'flowers/add', element: <FlowerAdd /> },
        { path: 'flowers/edit/:id', element: <FlowerEdit /> },
        { path: 'error', element: <Error /> },
        { path: '*', element: <Error /> }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}
