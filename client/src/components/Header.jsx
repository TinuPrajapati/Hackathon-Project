import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

const Header = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/logout`, {},
                {
                    withCredentials: true
                }
            );
            Swal.fire({
                title: response.data.message,
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login")
                }
            });
        } catch (error) {
            console.log(error)
        }
    };

    const getUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/user`, { withCredentials: true });
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <header className={`sticky top-2 z-10 h-[10vh] w-full flex items-center justify-center transition-all duration-300`}>
            <div className='w-[90%] h-full bg-white/80 backdrop-blur-xl flex items-center justify-between px-3 rounded-full shadow-lg'>
                <Link to="/" className="flex shrink-0 items-center">
                    <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                </Link>
                <div className="hidden sm:block">
                    <div className="flex space-x-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) => `${isActive ? "bg-purple-500 text-white" : "hover:text-white hover:bg-purple-300"} rounded-md  px-3 py-2 text-sm font-medium `} aria-current="page"
                        >
                            Squads
                        </NavLink>
                        <NavLink
                            to="/findmember"
                            className={({ isActive }) => `${isActive ? "bg-purple-500 text-white" : "hover:text-white hover:bg-purple-300"} rounded-md  px-3 py-2 text-sm font-medium `} aria-current="page"
                        >
                            Find a Member
                        </NavLink>
                        <NavLink
                            to="/projects"
                            className={({ isActive }) => `${isActive ? "bg-purple-500 text-white" : "hover:text-white hover:bg-purple-300"} rounded-md  px-3 py-2 text-sm font-medium `} aria-current="page"
                        >
                            Projects
                        </NavLink>
                    </div>
                </div>

                <div className="relative flex items-center space-x-4 sm:ml-6" onMouseLeave={() => setOpen(false)}>
                    <button type="button" className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
                        <span className="sr-only">View notifications</span>
                        <Bell className="size-6" />
                    </button>
                    <div className="relative">
                        <button type="button" className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-400 focus:outline-none" onClick={() => setOpen(!open)}>
                            {user?.profileImage ?
                                <img className="size-10 rounded-full" src={user?.profileImage} alt="User" />
                                :
                                <div className="w-10 h-10 custom-gradient rounded-full bg-purple-500 flex items-center justify-center text-white font-medium text-xl">
                                    {user?.name.charAt(0)}
                                </div>
                            }
                        </button>
                        {open && (
                            <div className="absolute right-0 z-10 w-40 rounded-md bg-white p-2 border-2 border-purple-400 ">
                                <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 duration-200 rounded-md text-[1rem] font-semibold">Your Profile</Link>
                                <Link to="/setting" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 duration-200 rounded-md text-[1rem] font-semibold">Settings</Link>
                                <button className="block px-4 py-2 text-gray-700 hover:bg-gray-200 duration-200 rounded-md text-[1rem] font-semibold" onClick={handleLogout}>Sign out</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
