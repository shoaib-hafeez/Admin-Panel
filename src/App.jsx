import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./auth/Login";
import Dashboard from "./dashboard/Dashboard";
import CreatePost from "./dashboard/Create-post";
import SignUp from "./auth/Signup";
import ForgetPassword from "./auth/Forget-Password";
import ResetPassword from "./auth/Reset-Password";
import ViewPosts from "./dashboard/View-Post";


function App() {
  const router = createBrowserRouter([
    { path: "/", element: <SignUp /> },
    { path: "/Login", element: <Login /> },
    { path: "/ForgetPassword", element: <ForgetPassword /> },
    { path: "/ResetPassword", element: <ResetPassword /> },
    {
      path: "/Dashboard",
      element: <Dashboard />,
      children: [
        { path: "Post/CreatePost", element: <CreatePost /> },
        { path: "Posts/ViewPost", element: <ViewPosts /> },
        { path: "/Dashboard/edit/:id", element:<CreatePost />},
      ],
    },
  
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
