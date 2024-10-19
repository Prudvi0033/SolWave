import React from 'react'
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <div className=' relative p-8 m-4 font-serif text-4xl font-bold text-[#013A4D] flex items-center list-none'>
        SolWave.
        <div className='flex font-sans items-center space-x-12 text-xl transition duration-300 font-normal tracking-wide text-center ml-[23.9rem]'>
  <NavLink to="/account" className={({ isActive }) =>
    `relative ${isActive ? 'scale-110 font-bold' : ''} 
    text-[#013A4D] hover:text-[#013A4D] cursor-pointer transition-all ease-in-out 
    before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-[#013A4D] 
    before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] 
    after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-[#013A4D] 
    after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] hover:scale-110`
  }>
    <li>Account</li>
  </NavLink>
  
  <NavLink to="/transaction" className={({ isActive }) =>
    `relative ${isActive ? 'scale-110 font-bold' : ''} 
    text-[#013A4D] hover:text-[#013A4D] cursor-pointer transition-all ease-in-out 
    before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-[#013A4D] 
    before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] 
    after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-[#013A4D] 
    after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] hover:scale-110`
  }>
    <li>Transaction</li>
  </NavLink>
  
  <NavLink to="/token" className={({ isActive }) =>
    `relative ${isActive ? 'scale-110 font-bold' : ''} 
    text-[#013A4D] hover:text-[#013A4D] cursor-pointer transition-all ease-in-out 
    before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-[#013A4D] 
    before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] 
    after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-[#013A4D] 
    after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%] hover:scale-110`
  }>
    <li>Token</li>
  </NavLink>
</div>
      </div>
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </>
  )
}

export default Header