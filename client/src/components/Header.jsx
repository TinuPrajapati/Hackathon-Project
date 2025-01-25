import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`sticky ${scrolled ? "top-[-100%]" : "top-2"} z-10 h-[10vh] w-full flex items-center justify-center transition-all duration-300`}>
            <div className='w-[90%] h-full bg-white/80 backdrop-blur-xl flex items-center justify-between px-3 rounded-full shadow-lg'>
                <Link to="/" className="flex shrink-0 items-center">
                    <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                </Link>
                <div className="hidden sm:block">
                    <div className="flex space-x-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) => `${isActive ? "bg-gray-900 text-white" : "hover:text-white hover:bg-gray-700"} rounded-md  px-3 py-2 text-sm font-medium `} aria-current="page"
                        >
                            Squads
                        </NavLink>
                        <NavLink
                            to="/members"
                            className={({ isActive }) => `${isActive ? "bg-gray-900 text-white" : "hover:text-white hover:bg-gray-700"} rounded-md  px-3 py-2 text-sm font-medium `} aria-current="page"
                        >
                            Find a Member
                        </NavLink>
                        <NavLink
                            to="/projects"
                            className={({ isActive }) => `${isActive ? "bg-gray-900 text-white" : "hover:text-white hover:bg-gray-700"} rounded-md  px-3 py-2 text-sm font-medium `} aria-current="page"
                        >
                            Projects
                        </NavLink>
                    </div>
                </div>

                <div className="relative flex items-center space-x-4 sm:ml-6" onMouseLeave={()=>setOpen(false)}>
                    <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                        <span className="sr-only">View notifications</span>
                        <Bell className="size-6" />
                    </button>
                    <div className="relative">
                        <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-400 focus:outline-none" onClick={() => setOpen(!open)}>
                            <img className="size-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" />
                        </button>
                        {open && (
                            <div className="absolute right-0 z-10 w-40 rounded-md bg-white p-2 border-2 border-purple-400 ">
                                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 duration-200 rounded-md text-[1rem] font-semibold">Your Profile</Link>
                                <Link to="/setting" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 duration-200 rounded-md text-[1rem] font-semibold">Settings</Link>
                                <button className="block px-4 py-2 text-gray-700 hover:bg-gray-200 duration-200 rounded-md text-[1rem] font-semibold">Sign out</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
