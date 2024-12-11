import { create } from 'zustand';
import axios from 'axios';
import axiosClient from '../lib/axios';

const useAuthStore = create((set) => ({
  userName: '',
  email: '',
  password: '',
  user: null, // Initial user state
  setUser: (user) => set({ user }), // Function to update user
  setUserName: (input) => set({ userName: input }),
  setEmail: (input) => set({ email: input }),
  setPassword: (input) => set({ password: input }),

  // Logout function
  logout: async () => {
    try {
      // Call the API to log out
      await axiosClient.post('/users/logout', {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Clear the Zustand state
      set({
        email: '',
        password: '',
        userName: '',
        user: null,
      });

      // Remove user data from local storage
      localStorage.removeItem('E-loginUser');
      alert('Logged out successfully!');
    } catch (error) {
      console.error('Logout API failed:', error.response ? error.response.data : error.message);
      alert('Failed to log out. Please try again.');
    }
  },

}));

export default useAuthStore;
