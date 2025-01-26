import React, { useEffect, useState } from 'react';
import { Bell, Brain, LogIn } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import logo from '../assets/BrainSquad_logo.jpg';
import Cookies from 'js-cookie'

const Header = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [friendRequests, setFriendRequests] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [login, setLogin] = useState(false)

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/logout`,
                {},
                {
                    headers: {
                        'Authorization': 'Bearer ' + Cookies.get('name')
                    },
                    withCredentials: true
                }
            );
            Swal.fire({
                title: response.data.message,
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login");
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/user`, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('name')
                },
                withCredentials: true
            });
            setUser(response.data);
            setFriendRequests(response.data.friendRequests || []);
            // console.log(response.data.friendRequests)
        } catch (error) {
            console.log(error);
        }
    };
    const check = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/check`, {
                headers: {
                    'Authorization': 'Bearer ' + Cookies.get('name')
                },
                withCredentials: true
            });
            setLogin(true)
            getUser()
        } catch (error) {
            setLogin(false)
        }
    };



    useEffect(() => {
        check();
    }, []);

    const handleAcceptRequest = async (requestId) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/accept`, { requestId }, { withCredentials: true });
            setFriendRequests(friendRequests.filter(req => req._id !== requestId));
            Swal.fire("Accepted!", "Friend request accepted.", "success");
        } catch (error) {
            console.log(error.response.data);
        }
    };

    const handleIgnoreRequest = async (requestId) => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/ignore`, { requestId }, { withCredentials: true });
            setFriendRequests(friendRequests.filter(req => req._id !== requestId));
            Swal.fire("Ignored!", "Friend request ignored.", "info");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header className={`sticky top-2 z-10 h-[10vh] w-full flex items-center justify-center transition-all duration-300`}>
            <div className='w-[90%] h-full bg-white/80 backdrop-blur-xl flex items-center justify-between px-3 rounded-full shadow-lg'>
                <Link to="/" className="flex shrink-0 items-center">
                    <div className="flex items-center space-x-2">
                        <Brain className="h-8 w-8 text-purple-600" />
                        <span className="text-xl font-bold text-purple-800">BrainSquads</span>
                    </div>
                    {/* <img className="h-8 w-auto" src={logo} alt="Your Company" /> */}
                </Link>

                <div className="hidden sm:block">
                    <div className="flex space-x-4">
                        <NavLink to="/" className={({ isActive }) => `${isActive ? "bg-purple-500 text-white" : "hover:text-white hover:bg-purple-300"} rounded-md  px-3 py-2 text-sm font-medium `}>
                            Squads
                        </NavLink>
                        <NavLink to="/findmember" className={({ isActive }) => `${isActive ? "bg-purple-500 text-white" : "hover:text-white hover:bg-purple-300"} rounded-md  px-3 py-2 text-sm font-medium `}>
                            Find a Member
                        </NavLink>
                        <NavLink to="/findprojects" className={({ isActive }) => `${isActive ? "bg-purple-500 text-white" : "hover:text-white hover:bg-purple-300"} rounded-md  px-3 py-2 text-sm font-medium `}>
                            Projects
                        </NavLink>
                    </div>
                </div>

                {login ?
                    <div className="relative flex items-center space-x-4 sm:ml-6" onMouseLeave={() => setOpen(false)}>
                        <button
                            type="button"
                            className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                            onClick={() => setShowDialog(true)}
                        >
                            <Bell className="size-6" />
                            {friendRequests.length > 0 && (
                                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                                    {friendRequests.length}
                                </span>
                            )}
                        </button>

                        <div className="relative">
                            <button
                                type="button"
                                className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-400 focus:outline-none"
                                onClick={() => setOpen(!open)}
                            >
                                {user?.profileImage ? (
                                    <img className="size-10 rounded-full" src={user.profileImage} alt="User" />
                                ) : (
                                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium text-xl">
                                        {user?.name.charAt(0)}
                                    </div>
                                )}
                            </button>
                            {open && (
                                <div className="absolute right-0 z-10 w-40 rounded-md bg-white p-2 border-2 border-purple-400">
                                    <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 duration-200 rounded-md text-[1rem] font-semibold">
                                        Your Profile
                                    </Link>
                                    <Link to="/create_squad" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 duration-200 rounded-md text-[1rem] font-semibold">
                                        Create Squad
                                    </Link>
                                    <Link to="/setting" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 duration-200 rounded-md text-[1rem] font-semibold">
                                        Settings
                                    </Link>
                                    <button className="block px-4 py-2 text-gray-700 hover:bg-gray-200 duration-200 rounded-md text-[1rem] font-semibold" onClick={handleLogout}>
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    :
                    <Link to="/login" className='bg-purple-500 text-white px-4 py-2 rounded-full'>Lgin/SignUp</Link>
                }
            </div>

            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/10 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Notification</h2>
                        {friendRequests.length > 0 ? (
                            friendRequests.map((request) => (
                                <div key={request._id} className="flex items-center justify-between mb-3 border-b pb-2">
                                    <img className="w-12 h-12 rounded-full" src={request.profileImage} alt={request.name} />
                                    <span className="text-lg font-medium">{request.name}</span>
                                    <div className="flex space-x-2">
                                        <button onClick={() => handleAcceptRequest(request._id)} className="px-3 py-1 bg-green-500 text-white rounded-md">Accept</button>
                                        <button onClick={() => handleIgnoreRequest(request._id)} className="px-3 py-1 bg-red-500 text-white rounded-md">Ignore</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No any Notification</p>
                        )}
                        <button onClick={() => setShowDialog(false)} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md w-full">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
