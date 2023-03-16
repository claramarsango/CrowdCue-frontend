import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './router/router';

export const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};
