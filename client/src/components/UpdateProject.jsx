import React from 'react'

const UpdateProject = () => {
    return (
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <div className="space-y-6">
                {formData.projects.map((project, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6">
                        <div className="space-y-4">
                            <div className="relative group">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                    <Camera className="text-white" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    value={project.title}
                                    onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    value={project.description}
                                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date
                                    </label>
                                    <input
                                        type="text"
                                        value={project.date}
                                        onChange={(e) => handleProjectChange(index, 'date', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        GitHub URL
                                    </label>
                                    <input
                                        type="url"
                                        value={project.github}
                                        onChange={(e) => handleProjectChange(index, 'github', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UpdateProject