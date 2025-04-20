import React from "react";

const DeleteConfirmModal = ({ onClose, onConfirm, isLoading }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete this news item? This action cannot be undone.</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 disabled:bg-red-400"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;