import React, { useState } from 'react';
import { Github, Linkedin, Twitter, Mail, Camera, Plus, X } from 'lucide-react';

function App() {
    const [formData, setFormData] = useState({
        name: 'John Developer',
        title: 'Senior Software Engineer',
        about: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        github: '',
        linkedin: '',
        twitter: '',
        email: '',
        skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
        profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200',
        coverImage: 'https://blog.pincel.app/wp-content/uploads/2023/09/0-add-hidden-text-or-symbol-into-AI-photo.jpg',
    });

    const [newSkill, setNewSkill] = useState('');

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
        }
    };

    const handleSkillRemove = (skillToRemove) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter(skill => skill !== skillToRemove),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <div className="min-h-screen">
            <form onSubmit={handleSubmit} className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-xl">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 relative">
                        <label className="relative group" htmlFor='profileImage'>
                            <img
                                src={formData.profileImage}
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-purple-500"
                            />

                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera className="text-white" />
                            </div>
                        </label>
                        <input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 'profileImage')}
                            className="hidden"
                        />

                        <div className="relative group w-full md:w-2/3">
                            <img
                                src={formData.coverImage}
                                alt="Cover"
                                className="w-full h-52 rounded-xl object-cover"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 'coverImage')}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <Camera className="text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="space-y-6 mb-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                About
                            </label>
                            <textarea
                                value={formData.about}
                                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            />
                        </div>

                        {/* Social Links */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Github size={16} className="inline mr-2" />
                                    GitHub URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.github}
                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="my-8 border-gray-200" />

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
                            onKeyPress={handleSkillAdd}
                            placeholder="Add a new skill (press Enter)"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <button type="button" className="px-6 py-2 border rounded-lg">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-purple-600 text-white rounded-lg">Save Changes</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default App;