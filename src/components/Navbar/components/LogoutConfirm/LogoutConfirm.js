import React from "react";

const LogoutConfirm = ({
  showLogoutConfirm,
  setShowLogoutConfirm,
  handleLogout,
}) => {
  return (
    showLogoutConfirm && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
          <h2 className="text-lg font-bold text-center">Confirm Logout</h2>
          <p className="mt-4 text-center">Are you sure you want to logout?</p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="px-4 py-2 text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleLogout();
                setShowLogoutConfirm(false);
              }}
              className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default LogoutConfirm;
