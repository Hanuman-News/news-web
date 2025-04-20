import React, { useState, useRef } from "react";

const AddNewsModal = ({
  isAddNewsOpen,
  setIsAddNewsOpen,
  handleAddNewsSubmit,
  onSuccess,
}) => {
  const [title, setTitle] = useState("");
  const [imagePath, setImagePath] = useState(null);
  const [article, setArticle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [newsType, setNewsType] = useState("sport");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePath(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePath(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image_path", imagePath);
    formData.append("article", article);
    formData.append("author_name", authorName);
    formData.append("type", newsType);
    try {
      await handleAddNewsSubmit(formData);

      // Reset form after submission
      setTitle("");
      setImagePath(null);
      setArticle("");
      setAuthorName("");
      setNewsType("sport");
      setIsAddNewsOpen(false);
      if (onSuccess) onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    isAddNewsOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-xl relative">
          <button
            onClick={() => setIsAddNewsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="mb-4 text-lg font-bold text-center">Add News</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* handleAddNewsSubmit */}
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-md"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                News Image
              </label>
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, JPEG (Max 5MB)
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      id="dropzone-file"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

            <textarea
              placeholder="Article"
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              required
              rows={4}
              className="p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Author Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded-md"
            />
            <select
              value={newsType}
              onChange={(e) => setNewsType(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="sport">Sport</option>
              <option value="health">Health</option>
              <option value="technology">Technology</option>
              <option value="politic">Politic</option>
            </select>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default AddNewsModal;
