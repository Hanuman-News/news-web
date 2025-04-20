import React, { useState } from "react";
import api from "../../../../utils/axios";

const EditNewsModal = ({ newsItem, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: newsItem.title,
    article: newsItem.article,
    author_name: newsItem.author_name,
    type: newsItem.type,
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("article", formData.article);
      formDataToSend.append("author_name", formData.author_name);
      formDataToSend.append("type", formData.type);
      if (formData.image) {
        formDataToSend.append("image_path", formData.image);
      }

      await api.post(`/news/${newsItem.id}?_method=PUT`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      
      onSave();
    } catch (error) {
      console.error("Failed to update news:", error);
      alert("Failed to update news.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="mb-4 text-lg font-bold text-center">Edit News</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
          <textarea
            name="article"
            placeholder="Article"
            value={formData.article}
            onChange={handleChange}
            required
            rows={4}
            className="p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="author_name"
            placeholder="Author Name"
            value={formData.author_name}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-md"
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="sport">Sport</option>
            <option value="health">Health</option>
            <option value="technology">Technology</option>
            <option value="politic">Politic</option>
          </select>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditNewsModal;