import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Sidebar from '../components/sidebar/Sidebar'
import "./layout.scss"

const Layout = ({ children }) => {
  
  return (
    <div className='layoutAdmin'>
      <div className='layoutNavbar'><Navbar /></div>
      <div className='layoutSidebar'><Sidebar/></div>
      <main className='layoutDynamic'>
        <div className="dynamicContent">
          {children}
        </div>
        <div className="footer">
        Registered Trademark © | It was carefully made by the TalaTurizm team.
        </div>
      </main>
    </div>
  )
}

export default Layout