import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Mail, Camera, X, Instagram, Plus } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function App() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gender: "",
        userId: "",
        about: "",
        skills: [],
        number: "",
        profileImage: "",
        coverImage: "",
        location: "",
        github: "",
        linkedin: "",
        twitter: "",
        portfolio: ""
    });

    const [newSkill, setNewSkill] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    // Handle profile and cover image upload
    const handleImageChange = (e) => {
        const { id } = e.target;
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                [id]: URL.createObjectURL(file),
            });
        }
    };

    const handleSkillAdd = (e) => {
        if (e.key === 'Enter' && newSkill.trim()) {
            setFormData({
                ...formData,
                skills: [...formData.skills, newSkill.trim()],
            });
            setNewSkill('');
            e.preventDefault();
        }
    };

    const handleSkillRemove = (skillToRemove) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter(skill => skill !== skillToRemove),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/user/update_user`, { ...formData, image: formData.profileImage }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });
            Swal.fire({
                title: response.data.message,
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/profile")
                }
            });
            getUser()
        } catch (error) {
            console.log(error);
        }
    };

    const getUser = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/user`, { withCredentials: true });
            setFormData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="min-h-screen">
            <form onSubmit={handleSubmit} className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 relative">
                        <label className="relative group" htmlFor="profileImage">
                            <div>
                                {formData.profileImage ?
                                    <img className="w-32 h-32 rounded-full border-4 border-purple-500" src={formData?.profileImage} alt="User" />
                                    :
                                    <div className="w-32 h-32 custom-gradient rounded-full bg-purple-500 flex items-center justify-center text-white font-medium text-7xl">
                                        {formData.name.charAt(0)}
                                    </div>
                                }
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera className="text-white" />
                            </div>
                        </label>
                        <input id="profileImage" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        <div className="relative group w-full md:w-2/3">
                            <img
                                src={formData.coverImage || '/placeholder-cover.jpg'}
                                alt="Cover"
                                className="w-full h-52 rounded-xl object-cover"
                            />
                            <input id="coverImage" type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                    </div>
                    <div className="space-y-6 mb-4">
                        <div className='flex gap-4'>
                            <div className='w-1/2'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    name='name'
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className='w-1/2'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <div className='w-1/2'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    name='number'
                                    type="text"
                                    maxLength={10}
                                    value={formData.number}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className='w-1/2'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                <input
                                    name="gender"
                                    type="text"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <div className='w-1/2'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">User Id</label>
                                <input
                                    name='userId'
                                    type="text"
                                    value={formData.userId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div className='w-1/2'>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    name='location'
                                    type="text"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
                            <textarea
                                name="about"
                                value={formData.about}
                                onChange={handleChange}
                                rows={2}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className=" mb-4">
                        <h2 className="text-2xl font-bold mb-4">Links</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Github size={16} className="inline mr-2" />
                                    GitHub URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.github}
                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Linkedin size={16} className="inline mr-2" />
                                    LinkedIn URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.linkedin}
                                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Twitter size={16} className="inline mr-2" />
                                    Twitter URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.twitter}
                                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Instagram size={16} className="inline mr-2" />
                                    PortFolio
                                </label>
                                <input
                                    type="url"
                                    value={formData.portfolio}
                                    onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </div>


                    </div>
                    {/* Skills Section */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Skills</h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {formData.skills.map((skill) => (
                                <span key={skill} className="px-4 py-2 bg-purple-600 text-white rounded-full flex items-center gap-2">
                                    {skill}
                                    <button type="button" onClick={() => handleSkillRemove(skill)} className="hover:text-red-200">
                                        <X size={16} />
                                    </button>
                                </span>
                            ))}
                        </div>
                        <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={handleSkillAdd}
                            placeholder="Add a new skill (press Enter)"
                            className="w-[100%] px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    <button type="button" className="px-6 py-2 border rounded-lg">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-purple-600 text-white rounded-lg">Save Changes</button>
                </div>
            </form>
        </div>
    );
}

export default App;
