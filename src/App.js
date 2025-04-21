import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // use this because have index.js
import NewsFeed from "./components/News/NewsFeed/NewsFeed";
import NewsDetails from "./components/News/NewsDetails/NewsDetails";

function App() {
  const [user, setUser] = useState(null);
  const [activeType, setActiveType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    // Example: Load user from localStorage or API
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  useEffect(() => {
    console.log("Current filters:", { type: activeType, search: searchQuery });
  }, [activeType, searchQuery]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Navbar
                activeType={activeType}
                setActiveType={setActiveType}
                user={user}
                setUser={setUser}
                setSearchQuery={setSearchQuery}
                setRefreshTrigger={setRefreshTrigger}
              />

              <NewsFeed
                user={user}
                type={activeType}
                searchQuery={searchQuery}
                isHome={activeType === "all"}
                refreshTrigger={refreshTrigger}
              />
            </div>
          }
        />
        <Route path="/news/:id" element={<NewsDetails user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
