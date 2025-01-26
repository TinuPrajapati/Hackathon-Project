import React, { useState, useRef } from "react";
import { Globe, Lock, Upload, X } from "lucide-react";
import axios from "axios";
import Swal from 'sweetalert2'

const AddNewProject = ({setIsDialogOpen}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    mode:"",
    image: "",
  });

  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/projects/add`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      Swal.fire({
        title: response.data.message,
        icon: "success"
      }).then((result) => {
        if (result.isConfirmed) {
          setIsDialogOpen(false)
        }
      });
    } catch (error) {
      // Error handling
      const message = error.response?.data?.message || "Login failed. Please try again.";
      setErrorMessage(message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-2">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create New Project
          </h2>

          {/* Project Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Project Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-500 outline-none rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Project Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-500 outline-none rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Project Link */}
          <div className="space-y-2">
            <label htmlFor="link" className="block text-sm font-medium text-gray-700">
              Project Link
            </label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="https://"
              className="w-full px-3 py-2 border border-gray-500 rounded-md outline-none shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Project Image */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Project Image</label>
            <div
              className="relative border-2 border-dashed border-gray-500 rounded-lg p-4 hover:border-blue-500 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-md border border-gray-500"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-2">
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer text-sm text-blue-600 hover:text-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="image-upload"
                        name="image"
                        type="file"
                        ref={fileInputRef}
                        className="sr-only outline-none"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Visibility Mode */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Visibility Mode</label>
            <div className="flex gap-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  value="Public"
                  checked={formData.mode === "Public"}
                  onChange={handleChange}
                  className="w-4 h-4 border-gray-500 focus:ring-blue-500 outline-none"
                />
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Public</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  value="Private"
                  checked={formData.mode === "Private"}
                  onChange={handleChange}
                  className="w-4 h-4 border-gray-500 outline-none focus:ring-blue-500"
                />
                <Lock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Private</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewProject;
