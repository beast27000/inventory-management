"use client";
import { useAppSelector, useAppDispatch } from '@/app/redux';
import { setIsSidebarCollapsed } from '@/app/state';
import { Archive, CircleDollarSign, Clipboard, Layout, LucideIcon, Menu, SlidersHorizontal, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Image from "next/image";

interface SidebarLinkProps{
    href: string;
    icon: LucideIcon;
    label: string;
    isCollapsed: boolean;
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    tabIndex?: number;
    as?: React.ElementType;
    'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
    'aria-disabled'?: boolean;
    'aria-hidden'?: boolean;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
    'aria-controls'?: string;
    'aria-owns'?: string;
    'aria-haspopup'?: boolean;
    'aria-expanded'?: boolean;
}

const SidebarLink = ({
    href,
    icon:Icon,
    label,
    isCollapsed,

}:SidebarLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href || (pathname ==="/" && href ==="/dashboard")

    return(   
        <Link href={href} >
            <div 
            className={`cursor-pointer flex items-center ${
                isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4" 
            }
            hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${isActive? "bg-blue-200 text-white":""}
            }`}
            >
                <Icon className="w-6 h-6 !text-gray-700" />

                <span className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray -700`}>
                    {label}
                </span>
                
                </div> 
        </Link>
    );
};


const Sidebar = () => {
    const dispatch = useAppDispatch();
    const isSidebarCollapsed = useAppSelector(
        (state) => state.global.isSidebarCollapsed
    );

    const toggleSidebar = () => {
        dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
    };

    const sidebarClassName = `fixed flex flex-col ${
        isSidebarCollapsed ? "w-0 md:w-16" : "w-80 md:w-72"
    } bg-white transition-all duration-300 h-full shadow-md z-40`;

    return (
        <div className={sidebarClassName}>
            {/* TOP LOGO AND TOGGLE BUTTON */}
            <div
                className={`flex gap-4 justify-between md:justify-normal items-center pt-8 ${
                    isSidebarCollapsed ? "px-4" : "px-8"
                }`}
            >

          <Image
              src="https://s3-inventorymanagement-vishvvesh.s3.us-east-1.amazonaws.com/logo.png"
              alt="Chipware-logo"
              width={27}
              height={27}
              className="rounded w-8"
            />
                    {!isSidebarCollapsed && (
                        <h1 className="font-bold text-xl leading-tight flex-1 text-center">
                            CHIPWARE <br /> TECHNOLOGIES
                        </h1>
                    )}

                <button
                    className="right-0 px-4 py-4 bg-gray-100 rounded-full hover:bg-blue-100"
                    onClick={toggleSidebar}
                >
                    <Menu className="w-4 h-4" />
                </button>
            </div>


            {/* LINKS */}      
            
            {/* The following sinppets are the side bar icons and button like things called side bar links ( ie buttons of a side bar with the logo of the sidebar )  */}
            

            <div className='flex-grow mt-8'>    {/* Dashboard Button or SidebarLink */}
                <SidebarLink 
                href='/dashboard'
                icon={Layout} 
                label="Dashboard" 
                isCollapsed={isSidebarCollapsed}
                />

                <SidebarLink                    /* Inventory Button or SidebarLink */
                href='/inventory'
                icon={Archive} 
                label="Inventory"  
                isCollapsed={isSidebarCollapsed}
                />

                <SidebarLink                    /* Products Button or SidebarLink */
                href='/products'
                icon={Clipboard} 
                label="Products" 
                isCollapsed={isSidebarCollapsed}
                />

                <SidebarLink                    /* Users Button or SidebarLink */
                href='/users'
                icon={User} 
                label="Users" 
                isCollapsed={isSidebarCollapsed}
                />

                
                <SidebarLink                    /* Settings Button or SidebarLink */
                href='/settings'
                icon={SlidersHorizontal} 
                label="Settings" 
                isCollapsed={isSidebarCollapsed}
                />

                <SidebarLink                    /* Expences Button or SidebarLink */
                href='/expenses'
                icon={CircleDollarSign} 
                label="Expences" 
                isCollapsed={isSidebarCollapsed}
                />
                
            </div>

{/* time stapm this got over was at 1:26:15 */}


            {/* FOOTER */}

            <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`} >
                <p className="text-center text-xs text-gray-500 pb-4">
                    &copy;2024 Chipware
                </p>
            </div>
        </div>
    );
};

export default Sidebar;
