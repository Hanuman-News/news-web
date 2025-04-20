import React, { useEffect, useState } from "react";
import api from "../../../utils/axios";
import NewsCard from "../NewsCard/NewsCard";

export default function NewsFeed({ user, type, searchQuery, refreshTrigger }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {};
      if (type !== "all") params.type = type;
      if (searchQuery && searchQuery.trim() !== "") params.search = searchQuery;

      const response = await api.get("/news", { params });
      setNews(response.data.data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setError("Failed to load news. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [type, searchQuery, refreshTrigger]);

  if (loading) return <div className="text-center p-8">Loading news...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!Array.isArray(news) || news.length === 0) {
    return (
      <div className="text-center p-8">
        {searchQuery 
          ? `No news found for "${searchQuery}"${type !== "all" ? ` in ${type} category` : ''}`
          : `No news found${type !== "all" ? ` in ${type} category` : ''}`
        }
      </div>
    );
  }
  
  return (
    <div className="lg:mx-36 xl:mx-52 p-4 space-y-8">
      
        <h3 className="text-2xl font-semibold capitalize">
          {searchQuery 
            ? `Search results for "${searchQuery}"${type !== "all" ? ` in ${type}` : ''}`
            : `${type} News`
          }
        </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map((item) => (
          <NewsCard key={item.id} item={item} user={user} />
        ))}
      </div>
    </div>
    
  );
}