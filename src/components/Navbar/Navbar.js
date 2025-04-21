import React, { useState} from "react";
import api from "../../utils/axios";
import AuthModal from "./components/AuthModal/AuthModal";
import AddNewsModal from "./components/AddNewsModal/AddNewsModal";
import LogoutConfirm from "./components/LogoutConfirm/LogoutConfirm";
import NewsTypeButtons from "./components/NewsTypeButtons/NewsTypeButtons";
import SearchBar from "./components/SearchBar/SearchBar";

export default function Navbar({
  activeType,
  setActiveType,
  user,
  setUser,
  setSearchQuery,
  setRefreshTrigger,
}) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [localSearch, setLocalSearch] = useState("");

  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false);

  const handleAuthSubmit = async (credentials) => {
    try {
      if (isRegister) {
        const response = await api.post("/register", credentials);
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
      } else {
        const response = await api.post("/login", {
          name: credentials.name,
          password: credentials.password,
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
      }
      setIsLoginOpen(false);
    } catch (error) {
      alert("Authentication failed. Please check your credentials.");
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed.");
    }
  };

  const handleAddNewsSubmit = async (formData) => {
    try {
      const token = localStorage.getItem("token");
      await api.post("/news", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("News posted successfully!");
    } catch (error) {
      console.error("Failed to post news:", error);
      alert("Failed to post news.");
    }
  };

  const handleSearchSubmit = (value = null) => {
    // If value is provided (from clear button), use that, otherwise use localSearch
    const search = value !== null ? value : localSearch;
    setSearchQuery(search);

    // If clearing search (empty value)
    if (search === "") {
      setLocalSearch("");
      setShowSearchInput(false); // Optional: hide search input when clearing
    }
  };
  const handleClearSearch = () => {
    handleSearchSubmit(""); // Explicitly pass empty string to clear
  };

  const handleTypeChange = (type) => {
    setActiveType(type);
    setSearchQuery(""); // Clear search when changing type
    setLocalSearch("");
  };

  return (
    <div className="sticky top-0 w-full shadow-md">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900">
        <SearchBar
          search={localSearch}
          setSearch={setLocalSearch}
          showSearchInput={showSearchInput}
          setShowSearchInput={setShowSearchInput}
          onSearchSubmit={handleSearchSubmit}
          onClearSearch={handleClearSearch}
        />

        {/* Logo */}
        <div className="text-2xl font-bold text-center text-blue-600 dark:text-white">
          Hanuman News
        </div>

        {/* Login Button */}
        {user ? (
          <div className="flex gap-2">
            <button
              className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
              onClick={() => setIsAddNewsOpen(true)}
            >
              Add News
            </button>
            <button
              className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
              onClick={() => setShowLogoutConfirm(true)}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={() => {
              setIsRegister(false);
              setIsLoginOpen(true);
            }}
          >
            Login
          </button>
        )}
      </div>

      <NewsTypeButtons
        activeType={activeType}
        setActiveType={handleTypeChange}
      />

      <AuthModal
        isLoginOpen={isLoginOpen}
        setIsLoginOpen={setIsLoginOpen}
        isRegister={isRegister}
        setIsRegister={setIsRegister}
        handleAuthSubmit={handleAuthSubmit}
      />

      <LogoutConfirm
        showLogoutConfirm={showLogoutConfirm}
        setShowLogoutConfirm={setShowLogoutConfirm}
        handleLogout={handleLogout}
      />

      <AddNewsModal
        isAddNewsOpen={isAddNewsOpen}
        setIsAddNewsOpen={setIsAddNewsOpen}
        handleAddNewsSubmit={handleAddNewsSubmit}
        onSuccess={() => setRefreshTrigger((prev) => prev + 1)}
      />
    </div>
  );
}
