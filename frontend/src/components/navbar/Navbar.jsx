// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Search from './search/Search'
import { FaShoppingCart, FaUser } from "react-icons/fa"

const Navbar = () => {

  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  const handleUserIconClick = () => {
    setDropdownOpen(!isDropdownOpen)
  }

  const handleWindowSizeChange = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  return (
    <header className="bg-color-accent">
    {isMobile ? (
      <div className="flex flex-col justify-between items-center p-4 gap-2">
        <Link href="/" className="font-bold text-white text-2xl">BAbY</Link>
        <div className='flex flex-row justify-between gap-8'>
          <Search />
          <div className='flex justify-between items-center'>
            <button className="text-2xl gap-2 mr-4">
              <FaShoppingCart size={24} />
            </button>

            <button 
              className="text-2xl gap-2" 
              onClick={handleUserIconClick}
              onBlur={() => setDropdownOpen(false)}
            >
              <FaUser size={24} />
            </button>
            {isDropdownOpen && (
                <ul className="absolute top-20 right-14 bg-color-primary rounded shadow-md mt-2">
                  <li className="py-2 px-8 hover:bg-color-primaryhov">
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li className="py-2 px-8 hover:bg-color-primaryhov">
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li className="py-2 px-8 hover:bg-color-primaryhov">
                    <button onClick={() => console.log('Logout')}>Logout</button>
                  </li>
                </ul>
              )}
          </div>
        </div>
      </div>
    ) : (
      <div className="flex flex-row justify-between items-center p-4 gap-2">
        <Link href="/" className="font-bold text-white text-2xl">BAbY</Link>
        <Search />
        <div className='flex justify-between items-center'>
          <button className="text-2xl gap-3 mr-6">
            <FaShoppingCart size={24} />
          </button>

          <button 
            className="text-2xl gap-3" 
            onClick={handleUserIconClick}
            onBlur={() => setDropdownOpen(false)}
          >
            <FaUser size={24} />
          </button>
          {isDropdownOpen && (
              <ul className="absolute top-10 right-6 bg-color-primary rounded shadow-md mt-2">
                <li className="py-2 px-8 hover:bg-color-primaryhov">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="py-2 px-8 hover:bg-color-primaryhov">
                  <Link to="/settings">Settings</Link>
                </li>
                <li className="py-2 px-8 hover:bg-color-primaryhov">
                  <button onClick={() => console.log('Logout')}>Logout</button>
                </li>
              </ul>
            )}
        </div>
      </div>
    )}
    </header>
  )
}

export default Navbar
