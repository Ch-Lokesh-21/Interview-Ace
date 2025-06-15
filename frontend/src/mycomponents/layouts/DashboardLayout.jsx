import { UserContext } from '@/context/userContext';
import React, { Children, useContext } from 'react'
import Navbar from './Navbar';

function DashboardLayout({children}) {
    const {user}=useContext(UserContext);
  return (
    <div>
        <Navbar/>
        {user && <div>{children}</div>}
    </div>
  );
};

export default DashboardLayout;