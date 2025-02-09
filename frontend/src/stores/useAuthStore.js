import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =import.meta.env.MODE==="development"? "https://chatpal-api.onrender.com":"/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoginIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
  
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkAuth");
      if (res.data) {
        set({ authUser: res.data });
  
        // Automatically reconnect the socket after page reload
        get().connectSocket();
      } else {
        set({ authUser: null });
      }
    } catch (error) {
      console.error("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  
  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed.");
    } finally {
      set({ isSigningUp: false });
    }
  },
  
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success(res.data.message);
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed.");
    }
  },
  
  login: async (data) => {
    set({ isLoginIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      toast.success("Login successful");
      set({ authUser: res.data });

      // Connect the socket after login
      get().connectSocket();
    } catch (error) {
      const message = error.response?.data?.message || "Login failed.";
      toast.error(message);
    } finally {
      set({ isLoginIn: false });
    }
  },
  
  updateProfilePicture: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile Updated Successfully.");
    } catch (error) {
      console.error("Error in updating profile:", error);
      toast.error(error.response?.data?.error || "Profile update failed.");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  
  connectSocket: () => {
    const { authUser, socket } = get();
  
    if (!authUser) {
      console.error("Cannot connect socket: User is not authenticated.");
      return;
    }
  
    if (socket) {
      console.log("Socket already exists. Checking status...");
      if (socket.connected) {
        console.log("Socket is already connected.");
        return;
      } else {
        console.warn("Socket exists but is not connected. Attempting reconnection...");
      }
    }
  
    try {
      const newSocket = io(`${BASE_URL}`, { query: { userId: authUser._id } });
  
      newSocket.on("connect", () => {
        console.log("Socket connected:", newSocket.id);
      });
  
      newSocket.on("getOnlineUsers", (userIds) => {
        set({ onlineUsers: userIds });
      });
  
      newSocket.on("disconnect", () => {
        console.log("Socket disconnected.");
      });
  
      set({ socket: newSocket });
    } catch (error) {
      console.error("Socket connection error:", error);
    }
  },
  disconnectSocket: () => {
    const { socket } = get();

    // Ensure that socket is connected before trying to disconnect
    if (socket?.connected) {
      socket.disconnect();
      console.log("Socket disconnected.");
      set({ socket: null });
    }
  },
}));
