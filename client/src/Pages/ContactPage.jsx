import React, { useState } from 'react';
import background from '../assets/background.png'

const ContactUsHero = () => {
  return (
    <section className="flex bg-purple-500 text-white py-20 px-6 h-[70vh]">
      <div className="max-w-7xl m-auto text-center flex flex-col items-center py-auto">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-lg mb-8">
          We'd love to hear from you! Fill out the form below or reach out to us directly.
        </p>
        <a
          href="#contact-form"
          className="bg-yellow-300 text-purple-500 px-6 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition duration-300"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Form submitted!');
  };

  return (
    <section id="contact-form" className="bg-purple-500 py-20 px-6">
      <div className="max-w-4xl py-10 mx-auto text-center border border-4 border-yellow-300">
        <h2 className="text-3xl font-bold text-white mb-6">Contact Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full md:w-1/2 px-6 py-3 border border-yellow-300 focus:ring-2 rounded-md text-lg"
            />
          </div>
          <div className="flex flex-col items-center">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full md:w-1/2 px-6 py-3 border border-yellow-300 focus:ring-2 rounded-md text-lg"
            />
          </div>
          <div className="flex flex-col items-center">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full md:w-1/2 px-6 py-3 border border-yellow-300 focus:ring-2 rounded-md text-lg h-32"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-white py-3 px-8 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105" style={{  backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const ContactPage = () => {
  return (
    <div>
      <ContactUsHero />
      <ContactFormSection />
    </div>
  );
};

export default ContactPage;
