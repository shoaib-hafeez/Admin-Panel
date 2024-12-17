import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import AppStore from "../store/App-Store";
import { getAllPostsApi } from "../services/post.service";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { posts, setPosts } = AppStore();

  // Fetch posts only when the location is `/Dashboard/ViewPost`
  useEffect(() => {
    if (location.pathname === "/Dashboard/Posts/ViewPost") {
     getAllPostsApi()
        .then((response) => setPosts(response.data.data.posts))
        .catch((error) => console.error("Failed to fetch posts:", error));
    }
  }, [location.pathname, setPosts]);

  return (
    <div className="dashboard">
      <div className="dashboard_header">
        <Header />
      </div>
      <div className="sidebar">
        <Sidebar
          handleButtonClick={(view) => {
            // Navigate to the appropriate route
            if (view === "createPost") {
              navigate("/Dashboard/Post/CreatePost");
            } else if (view === "viewPosts") {
              navigate("/Dashboard/Posts/ViewPost");
            }
          }}
        />
      </div>
      <div className="dashboard_content">
        {/* Nested routes will render dynamically here */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
