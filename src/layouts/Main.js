import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <div>
      <nav className='w-50 mx-auto'>
        <Link className='mx-5 fs-3 text-info' to='/register'>Register</Link>
        <Link className='mx-5 fs-3 text-info' to='/login'>Login</Link>
      </nav>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;