import React from "react";
import mission from '../assets/mission.png';

const AboutHero = () => {
  return (
    <div className="relative h-[80vh] ">
  <video
    className="absolute inset-0 w-full h-full object-cover bg-gradient-to-t from-purple-500 to-transparent"
    autoPlay
    loop
    muted
  >
    <source
      src="https://videos.pexels.com/video-files/5453622/5453622-uhd_2560_1440_24fps.mp4" 
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>
  <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
    <div>
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-yellow-300">
        About Us
      </h1>
      <p className="text-lg sm:text-xl mb-6">
        We are a team dedicated to creating impactful solutions for the future. Learn more about our mission and values.
      </p>
      <a href="#mission" className="bg-transparent border border-2 border-white text-white py-2 px-6 rounded-lg text-lg hover:bg-purple-600 transition">
        Learn More
      </a>
    </div>
  </div>
</div>

    
  );
};

const MissionSection = () => {
  return (
    <div id="mission" className="py-16 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-center flex items-center justify-evenly px-20">
      <div className="text-left w-1/2">
        <h2 className="text-5xl font-bold text-yellow-300 mb-6 text-center">Our Mission</h2>
        <div className="mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-16 h-16 mx-auto text-yellow-300 animate-spin"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
            ></path>
          </svg>
        </div>
        <p className="text-lg text-white mx-auto">
          Our mission is to empower individuals and organizations through innovative solutions, fostering creativity and sustainability while ensuring social impact. We aim to be the leaders in problem-solving and change-making across various industries.
        </p>
      </div>
      <div className="flex-shrink-0 mr-8">
        <img
          src={mission}
          alt="Mission Image"
          className="w-72 h-auto rounded-lg "
        />
      </div>
    </div>
  );
};



const ValuesSection = () => {
  return (
    <div id="values" className="py-16 bg-yellow-300 text-center">
      <h2 className="text-3xl font-bold text-purple-500 mb-6">Our Values</h2>
      <div className="flex justify-around space-x-10">
        <div className="w-60 bg-purple-500 p-6 rounded-lg shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-16 h-16 mx-auto text-yellow-300 mb-4"
          >
            <path
              d="M10 2L9.8 4.4L7 5V7L10 6.4L11.2 8H13.6L14.8 6.4L18 7V5L15.2 4.4L15 2H10ZM3 19C3 17.34 5.34 16 7 16H17C18.66 16 21 17.34 21 19V21H3V19Z"
            ></path>
          </svg>
          <h3 className="text-xl font-semibold text-yellow-300 mb-3">Integrity</h3>
          <p className="text-white">
            We believe in being honest, transparent, and ethical in everything we do.
          </p>
        </div>
        <div className="w-60 bg-purple-500 p-6 rounded-lg shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-16 h-16 mx-auto text-yellow-300 mb-4"
          >
            <path
              d="M12 2L12 22M2 12L12 12L22 12"
            ></path>
          </svg>
          <h3 className="text-xl font-semibold text-yellow-300 mb-3">Collaboration</h3>
          <p className="text-white">
            Teamwork is at the heart of our success. We value partnerships and shared achievements.
          </p>
        </div>
        <div className="w-60 bg-purple-500 p-6 rounded-lg shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-16 h-16 mx-auto text-yellow-300 mb-4"
          >
            <path
              d="M3 12L2 20L8 18L10 22L12 14L14 22L16 18L22 20L21 12L18 10L22 8L21 2L12 4L10 2L8 8L3 10L2 12Z"
            ></path>
          </svg>
          <h3 className="text-xl font-semibold text-yellow-300 mb-3">Innovation</h3>
          <p className="text-white">
            We are committed to pushing boundaries and exploring new solutions to create positive change.
          </p>
        </div>
      </div>
    </div>
  );
};

const TeamSection = () => {
  return (
    <div id="team" className="py-16 bg-purple-500 text-center">
    <h2 className="text-3xl font-bold text-yellow-300 mb-6">Meet Our Team</h2>
    <div className="mb-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-16 h-16 mx-auto text-yellow-300"
      >
        <path
          d="M12 2C7.58 2 4 5.58 4 10C4 12.21 5.42 14.18 7.53 15.23C7.14 16.43 6 17.21 6 18C6 19.66 7.34 21 9 21H15C16.66 21 18 19.66 18 18C18 17.21 16.86 16.43 16.47 15.23C18.58 14.18 20 12.21 20 10C20 5.58 16.42 2 12 2ZM9 18C8.45 18 8 17.55 8 17C8 16.45 8.45 16 9 16C9.55 16 10 16.45 10 17C10 17.55 9.55 18 9 18ZM15 18C14.45 18 14 17.55 14 17C14 16.45 14.45 16 15 16C15.55 16 16 16.45 16 17C16 17.55 15.55 18 15 18Z"
        ></path>
      </svg>
    </div>
    <p className="text-lg text-white mb-12 mx-auto max-w-3xl">
      Our team consists of passionate individuals with diverse skills and expertise. We work together to solve complex problems and bring fresh perspectives to every project.
    </p>
    <div className="flex justify-center space-x-10">
      {/* Team Member 1 */}
      <div className="text-center">
        <div className="w-40 h-40 bg-yellow-300 rounded-full flex items-center justify-center text-2xl text-purple-500 mx-auto">
          <span>👩‍💻</span>
        </div>
        <p className="text-xl text-yellow-300 mt-4">Tinu Prajapati</p>
        <p className="text-white text-sm">Lead Developer</p>
      </div>

      {/* Team Member 2 */}
      <div className="text-center">
        <div className="w-40 h-40 bg-yellow-300 rounded-full flex items-center justify-center text-2xl text-purple-500 mx-auto">
          <span>👨‍💻</span>
        </div>
        <p className="text-xl text-yellow-300 mt-4">Vipin Kushwaha</p>
        <p className="text-white text-sm">Developer</p>
      </div>

      {/* Team Member 3 */}
      <div className="text-center">
        <div className="w-40 h-40 bg-yellow-300 rounded-full flex items-center justify-center text-2xl text-purple-500 mx-auto">
          <span>🧑‍💼</span>
        </div>
        <p className="text-xl text-yellow-300 mt-4">3rd Floor</p>
        <p className="text-white text-sm">Designer</p>
      </div>
    </div>
  </div>
  );
};

const AboutPage = () => {
  return (
    <div>
      <AboutHero />
      <MissionSection />
      <ValuesSection />
      <TeamSection />
    </div>
  );
};

export default AboutPage;
