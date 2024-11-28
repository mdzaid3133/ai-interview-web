import React from 'react'
import Header from './_components/Header'

function DashboardLayout({ children }) {
  return (
    <div>
      <Header />
      <div
        className='h-full'
        
      >
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;
