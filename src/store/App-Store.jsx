import { create } from "zustand";
import axiosClient from "../lib/axios"; // Ensure axiosClient is set up for API calls
import { deletePostApi } from "../services/post.service";

const AppStore = create((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),

  // Delete a post via API and update state
  deletePost: async (postId) => {
    try {
      //yeh api post service m bni hoi h or yaha call ki h 
      await deletePostApi(`${postId}`)     //axiosClient.delete(`/social-media/posts/${postId}`);
      set((state) => ({
        posts: state.posts.filter((post) => post._id !== postId),
      }));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  },
}));

export default AppStore;
