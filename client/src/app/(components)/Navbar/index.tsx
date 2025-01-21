"use client";
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsDarkMode, setIsSidebarCollapsed } from '@/app/state';
import { Bell, Menu, Moon, Settings, Sun } from 'lucide-react';
import Link from "next/link";
import React from 'react';

const Navbar = () => {
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector(
        (state) => state.global.isSidebarCollapsed
    );

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    const toggleSidebar = () => {
        console.log('Navbar toggle (before dispatch):', isSidebarCollapsed); // Debugging log
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
        console.log('Navbar toggle (after dispatch):', !isSidebarCollapsed); // Debugging log
    };

    const toggleDarkmode = () => {
        dispatch(setIsDarkMode(!isDarkMode));
    };
    

    return (
        <div className="flex justify-between items-center w-full mb-7">
            
            {/* LEFT SIDE ( menubar button )*/}
            
            <div className="flex items-center gap-20">
                {/* Show Navbar Menu Button when Sidebar is collapsed */}
                {isSidebarCollapsed && (
                    <button
                        className="ml-auto px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100 z-50" // Added z-index for visibility
                        onClick={toggleSidebar}
                    >
                        <Menu className="w-6 h-6" /> {/* Increased icon size */}
                    </button>
                )}

                {/* Search Bar */}

                <div className="relative ml-20">
                    <input
                        type="search"
                        placeholder="Start typing to search groups & products"
                        className="pl-10 pr-4 py-4 w-64 md:w-80 border-2 
                        border-gray-300 bg-white rounded-lg focus:outline-none 
                        focus:border-blue-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex 
                    items-center pointer-events-none">
                        <Bell className="text-gray-500" size={20} />
                    </div>
                </div>
            </div>


      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div>
            <button onClick={toggleDarkmode}>
              {isDarkMode ? (
                <Sun className="cursor-pointer text-gray-500" size={24} />
              ) : (
                <Moon className="cursor-pointer text-gray-500" size={24} />
              )}
            </button>
          </div>
          <div className="relative">
            <Bell className="cursor-pointer text-gray-500" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] 
            py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <span className="font-semibold">Vishvvesh Nagappan</span>
          </div>
        </div>
        <div className="flex items-center gap-3"> 
            <Link href="/settings">
                <Settings className="cursor-pointer text-gray-500" size={24} /> 
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
