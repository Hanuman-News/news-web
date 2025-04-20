import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../utils/axios";
import { formatDistanceToNow } from "date-fns";
import EditNewsModal from "../NewsCard/Edit/EditNewsModal";
import DeleteConfirmModal from "../NewsCard/Delete/DeleteConfirmModal";

const NewsDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        const response = await api.get(`/news/${id}`);
        setNewsItem(response.data.data);
      } catch (err) {
        setError("Failed to load news details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/news/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Failed to delete news:", error);
      alert("Failed to delete news.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!newsItem) return <div className="text-center p-8">News not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
      >
        &larr; Back to News
      </button>

      <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>

      {newsItem.image_path && (
        <img
          src={`http://127.0.0.1:8000/storage/${newsItem.image_path}`}
          alt={newsItem.title}
          className="w-full h-auto max-h-96 object-cover rounded-lg mb-6"
        />
      )}

      <div className="flex items-center justify-between mb-6">
        <span className="text-gray-600">By {newsItem.author_name}</span>
        <span className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(newsItem.created_at), {
            addSuffix: true,
          })}
        </span>
      </div>

      <div className="prose max-w-none">
        <p className="whitespace-pre-line">{newsItem.article}</p>
      </div>

      {user && (
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => setIsDeleting(true)}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
      {/* Edit Modal */}
      {isEditing && (
        <EditNewsModal
          newsItem={newsItem}
          onClose={() => setIsEditing(false)}
          onSave={() => {
            setIsEditing(false);
            // Refresh the data
            setLoading(true);
            api
              .get(`/news/${id}`)
              .then((response) => setNewsItem(response.data.data))
              .catch((err) => setError("Failed to refresh news"))
              .finally(() => setLoading(false));
          }}
        />
      )}

      {/* Delete Modal */}
      {isDeleting && (
        <DeleteConfirmModal
          onClose={() => setIsDeleting(false)}
          onConfirm={handleDelete}
          isLoading={loading}
        />
      )}
    </div>
  );
};

export default NewsDetails;