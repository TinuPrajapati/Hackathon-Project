import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

function userProfile() {
  return (
    <div className="min-h-screen" >
      <div className="container mx-auto px-4 py-2" >
        <div className="max-w-full mx-auto backdrop-blur-lg rounded-2xl p-8 text-white" >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 pr-4 rounded-xl relative">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-purple-500 absolute left-5"
            />
            <img
              src="https://blog.pincel.app/wp-content/uploads/2023/09/0-add-hidden-text-or-symbol-into-AI-photo.jpg"
              alt="Profile"
              className="w-[70%] h-52 rounded-xl"
            />
            <div className="text-center md:text-left border-2 bg-white border-purple-500 h-52 flex flex-col justify-center p-8 rounded-xl">
              <h1 className="text-3xl font-bold mb-2 text-gray-950">John Developer</h1>
              <p className="text-xl text-gray-700 mb-4">Senior Software Engineer</p>
              <p className="text-gray-600 mb-4">Squad: Innovation Team Alpha</p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="#" aria-label="GitHub" className="text-gray-600  hover:text-gray-800 transition-colors"><Github size={24} /></a>
                <a href="#" aria-label="LinkedIn" className="text-gray-600  hover:text-gray-800 transition-colors"><Linkedin size={24} /></a>
                <a href="#" aria-label="Twitter" className="text-gray-600  hover:text-gray-800 transition-colors"><Twitter size={24} /></a>
                <a href="#" aria-label="Email" className="text-gray-600  hover:text-gray-800 transition-colors"><Mail size={24} /></a>
              </div>
            </div>
          </div>
          <div className='w-full text-gray-950'>
            <h1 className='text-3xl mb-5'>About</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci dolores dolore sequi sapiente sit, fugiat corporis vel voluptatum excepturi tempora omnis, explicabo cum saepe, fugit quo distinctio asperiores maiores nobis?</p>
          </div>
                    <hr className='mt-8 mb-8 text-purple-500' />
          {/* Skills Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-950">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS', 'Docker', 'Python', 'CI/CD'].map((skill) => (
                <span key={skill} className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors" style={{ background: 'linear-gradient(to bottom right, #d24df7, #7000f0)'}}>
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