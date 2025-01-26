import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, Instagram, ContactRound } from 'lucide-react';
import axios from 'axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import NewAddProject from './NewAddProject'; // Import the NewAddProject component
import Swal from 'sweetalert2'

function UserProfile() {
  const { id } = useParams();
  const loaction = useLocation();
  const [user, setUser] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    mode: "",
    image: "https://img.freepik.com/free-photo/project-plan-program-activity-solution-strategy-concept_53876-15827.jpg?t=st=1737881778~exp=1737885378~hmac=6a6736b01fc18ad20b1bdb75ba24cabd231a46cea0f19384eab463911d0d013d&w=740",
  }); // State to manage dialog visibility

  const getUser = async () => {
    try {
      let response = ""
      if (id) {
        response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/${id}`,
          { withCredentials: true }
        );
      } else {
        response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/user`,
          { withCredentials: true }
        );
      }
      setUser(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("link", formData.link);
      formDataToSend.append("mode", formData.mode);

      // If the image is a file, append it properly
      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/projects/add`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        }
      );

      Swal.fire({
        title: response.data.message,
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          setIsDialogOpen(false);
          getUser();
        }
      });
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add project. Please try again.";
      console.log(error);
      Swal.fire({
        title: "Error",
        text: message,
        icon: "error"
      });
    }
  };


  useEffect(() => {
    getUser();
  }, [id]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-2">
        <div className="max-w-full mx-auto backdrop-blur-lg rounded-2xl p-8 text-white">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 pr-4 rounded-xl relative">
            <div className="w-32 h-32 rounded-full border-4 border-white absolute left-5">
              {user?.profileImage ? (
                <img
                  className="w-full h-full rounded-full bg-white"
                  src={user.profileImage}
                  alt={`${user.name || "User"}'s profile`}
                />
              ) : (
                <div className="w-full h-full custom-gradient text-7xl rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">
                  {user.name?.charAt(0) || "U"}
                </div>
              )}
            </div>
            <img
              src="https://blog.pincel.app/wp-content/uploads/2023/09/0-add-hidden-text-or-symbol-into-AI-photo.jpg"
              alt="Profile Background"
              className="w-[70%] h-52 rounded-xl"
            />
            <div className="text-center md:text-left border-2 bg-white border-purple-500 h-52 flex flex-col justify-center p-8 rounded-xl">
              <h1 className="text-3xl font-bold mb-2 text-gray-950">{user.name || "Guest"}</h1>
              <p className="text-lg text-gray-700 mb-2">User Id: {user.userId || "N/A"}</p>
              <p className="text-gray-600 mb-4">Squad: {user?.clan || "none"}</p>
              <div className="flex gap-4 justify-center md:justify-start text-black">
                <Link to={user.github} target='_blank' className='text-black'><Github /></Link>
                <Link to={user.linkedin} target='_blank' className='text-black'><Linkedin /></Link>
                <Link to={user.twitter} target='_blank' className='text-black'><Twitter /></Link>
                <Link to={user.portfolio} target='_blank' className='text-black'><ContactRound /></Link>
              </div>
            </div>
          </div>

          <div className="w-full text-gray-950">
            <h1 className="text-3xl mb-5">About:</h1>
            <p>{user?.about || "No information provided."}</p>
          </div>
          <hr className="mt-8 mb-8 text-purple-500" />

          {/* Skills Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-950">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {user?.skills?.length > 0 ? (
                user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full bg-purple-600 text-white"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p>No skills added yet.</p>
              )}
            </div>
          </div>

          {/* Projects Section */}
          <div className="mb-12">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-6 text-gray-950">Projects</h2>
              {loaction.pathname == "/profile" && <button
                onClick={() => setIsDialogOpen(true)}
                className="px-4 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600"
              >
                Add New Project
              </button>}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {user.projects?.length > 0 ? (
                user.projects.map((project) => (
                  <div
                    key={project.title}
                    className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors border-purple-500 border-4"
                  >
                    <img
                      src={project.projectImage}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="px-4 py-3 bg-gradient-to-br from-[#d24df7] to-[#7000f0]">
                      <div className="flex justify-between items-start mb-2 ">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <span className="text-sm text-white">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>

                      </div>
                      <p className="text-white/70 mb-4">{project.description}</p>
                      <a
                        href={project.github}
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                      >
                        <Github size={18} />
                        <span>View Project</span>
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p>No projects added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dialog Box for Adding a New Project */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-lg h-max shadow-lg p-4 w-full max-w-lg relative">
            {/* Cross Button */}
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Close"
            >
              ×
            </button>
            <NewAddProject handleSubmit={handleSubmit} setFormData={setFormData} formData={formData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
