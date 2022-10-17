import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import RegisterReactBootstrap from './components/RegisterReactBootstrap';
import Main from './layouts/Main';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: <RegisterReactBootstrap></RegisterReactBootstrap>
        },
        {
          path: '/register',
          element: <RegisterReactBootstrap></RegisterReactBootstrap>
        },
        {
          path: '/login',
          element: <Login></Login>
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
