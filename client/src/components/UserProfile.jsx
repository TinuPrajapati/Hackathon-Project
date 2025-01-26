import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import staticimage from '../assets/background.webp';


function userProfile() {
  const [user, setUser] = useState({});
  const getUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/user`, { withCredentials: true });
      setUser(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <div className="min-h-screen" >
      <div className="container mx-auto px-4 py-2" >
        <div className="max-w-full mx-auto backdrop-blur-lg rounded-2xl p-8 text-white" >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 pr-4 rounded-xl relative">
            <div className="w-32 h-32 rounded-full border-4 border-white absolute left-5 z-10">
              {user?.profileImage ?
                <img className="size-10 rounded-full" src={user.profileImage} alt="User" />
                :
                <div className="w-full h-full custom-gradient text-7xl rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">
                  {user?.name?.charAt(0)}
                </div>
              }
            </div>
            <img
              src={staticimage}
              alt="Profile"
              className="w-[70%] h-52 rounded-xl object-cover brightness-125"
            />
            <div className="text-center md:text-left border-2 bg-white border-purple-500 h-52 flex flex-col justify-center p-8 rounded-xl">
              <h1 className="text-3xl font-bold mb-2 text-gray-950">{user.name}</h1>
              <p className="text-lg text-gray-700 mb-2">User Id: {user.userId}</p>
              <p className="text-gray-600 mb-4">Squad: {user?.clan ? user.clan :"none" }</p>
              <div className="flex gap-4 justify-center md:justify-start">
                {user?.links?.map((el,index)=>{
                  <Link to={el?.value} aria-label="GitHub" key={index} className="text-gray-600  hover:text-gray-800 transition-colors">{el?.keys}</Link>
                })}
                
              </div>
            </div>
          </div>
          <div className='w-full text-gray-950'>
            <h1 className='text-3xl mb-5'>About :</h1>
            <p>{user?.about}</p>
          </div>
          <hr className='mt-8 mb-8 text-purple-500' />
          {/* Skills Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-950">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {user?.skills?.map((skill) => (
                <span key={skill} className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors" style={{ background: 'linear-gradient(to bottom right, #d24df7, #7000f0)' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-950">Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'E-Commerce Platform',
                  description: 'Built a scalable e-commerce solution using microservices architecture',
                  date: '2023',
                  github: 'https://github.com',
                  image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800&h=400',
                },
                {
                  title: 'AI Chat Application',
                  description: 'Developed an AI-powered chat platform with real-time translation',
                  date: '2023',
                  github: 'https://github.com',
                  image: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&q=80&w=800&h=400',
                },
                {
                  title: 'Analytics Dashboard',
                  description: 'Created a real-time analytics dashboard with data visualization',
                  date: '2022',
                  github: 'https://github.com',
                  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=400',
                },
              ].map((project) => (
                <div key={project.title} className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors border-purple-500 border-4" style={{ background: 'linear-gradient(to bottom right, #d24df7, #7000f0)' }}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <span className="text-sm text-white/60">{project.date}</span>
                    </div>
                    <p className="text-white/70 mb-4">{project.description}</p>
                    <div className="flex gap-4">
                      <a href={project.github} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                        <Github size={18} />
                        <span>View Project</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default userProfile;