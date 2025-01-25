import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import {NavLink} from 'react-router-dom';

const Header = () => {
    const [open, setOpen] = useState(false);
    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 h-14 w-full flex items-center justify-between px-6 py-4">
            <div className="flex shrink-0 items-center">
                <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                    <a className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Squads</a>
                    <a className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white">Find a Member</a>
                    <a className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white">Projects</a>
                </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0" onMouseLeave={() => setOpen(false)}>
                <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                    <span className="sr-only">View notifications</span>
                    <Bell className="size-6" />
                </button>
                <div className="relative ml-3" >
                    <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none" onClick={() => setOpen(true)}>
                        <img className="size-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" />
                    </button>
                    <div className={`${open ? "block" : "hidden"} absolute right-0 z-10 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none`}>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700">Your Profile</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700">Settings</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700">Sign out</a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
