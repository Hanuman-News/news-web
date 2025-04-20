import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import api from "../../../utils/axios";
import EditNewsModal from "./Edit/EditNewsModal";
import DeleteConfirmModal from "./Delete/DeleteConfirmModal";
import { useNavigate } from "react-router-dom";

export default function NewsCard({ item, user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/news/${item.id}`);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/news/${item.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Failed to delete news:", error);
      alert("Failed to delete news.");
    } finally {
      setIsLoading(false);
      setIsDeleting(false);
    }
  };

  return (
    <div className={`border rounded shadow-sm p-4`}>
      <div onClick={handleCardClick} className="cursor-pointer">
        {item.image_path && (
          <img
            src={`http://127.0.0.1:8000/storage/${item.image_path}`}
            alt={item.title}
            className={`w-full object-cover rounded h-48 mb-4`}
          />
        )}
        <h2 className="text-xl font-bold">{item.title}</h2>
        <p className="text-gray-700 mb-2">
          {item.article.length > 200
            ? item.article.slice(0, 100) + "..."
            : item.article}
        </p>
        <p className="text-sm text-gray-500">
          {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
        </p>
      </div>

      {!!user && (
        <div
          className="mt-2 flex justify-end space-x-4"
          onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking buttons
        >
          <button onClick={() => setIsEditing(true)} className="text-blue-500">
            Edit
          </button>
          <button onClick={() => setIsDeleting(true)} className="text-red-500">
            Delete
          </button>
        </div>
      )}

      {isEditing && (
        <EditNewsModal
          newsItem={item}
          onClose={() => setIsEditing(false)}
          onSave={() => {
            setIsEditing(false);
            window.location.reload();
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleting && (
        <DeleteConfirmModal
          onClose={() => setIsDeleting(false)}
          onConfirm={handleDelete}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
