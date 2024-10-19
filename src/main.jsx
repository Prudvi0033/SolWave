import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import Transaction from './components/Transaction';
import Token from './components/Token';
import App from './App';
import TransferSol from './subcomponents/TransferSol';
import SignMsg from './subcomponents/SignMsg';
import Airdrop from './components/Airdrop';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/account",
        element: <Airdrop />,
      },
      {
        path: "/transaction",
        element: <Transaction />,
        children: [
          {
            path: "transfer",
            element: <TransferSol />,
          },
          {
            path: "sign",
            element: <SignMsg />,
          },
        ],
      },
      {
        path: "/token",
        element: <Token />,
      },
      {
        path: "/",
        element: <Navigate to="/account" />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
