import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authAPI } from "../api/common/auth";

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: false, // New state to track initialization
      error: null,
      isEmailVerified: false,

      // Actions
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      // Register user
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.register(userData);
          set({
            user: response,
            accessToken: response.accessToken,
            isAuthenticated: true,
            isEmailVerified: false,
            isLoading: false,
            isInitialized: true,
          });
          localStorage.setItem("accessToken", response.accessToken);
          return { success: true, data: response };
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Registration failed";
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      // Login user
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.login(credentials);

          set({
            user: response,
            accessToken: response.accessToken,
            isAuthenticated: true,
            isEmailVerified: response.emailVerified,
            isLoading: false,
            isInitialized: true,
          });
          localStorage.setItem("accessToken", response.accessToken);
          return { success: true, data: response };
        } catch (error) {
          const errorMessage = error.response?.data?.message || "Login failed";
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      // Verify email
      verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.verifyEmail(code);
          set({
            user: response.user,
            isEmailVerified: response.user.emailVerified,
            isLoading: false,
          });
          return { success: true, data: response };
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Email verification failed";
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      // Resend verification
      resendVerification: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.resendVerification();
          set({ isLoading: false });
          return { success: true, data: response };
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Failed to resend verification";
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      // Get user profile
      getProfile: async () => {
        const { isAuthenticated } = get();
        if (!isAuthenticated) {
          return { success: false, error: "Not authenticated" };
        }

        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.getProfile();
          set({
            user: response,
            isEmailVerified: response.emailVerified,
            isLoading: false,
          });
          return { success: true, data: response };
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Failed to get profile";
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      // Update profile
      updateProfile: async (profileData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authAPI.updateProfile(profileData);
          set({
            user: response,
            isLoading: false,
          });
          return { success: true, data: response };
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || "Failed to update profile";
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      // Logout
      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await authAPI.logout();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          // Clear state regardless of API call success
          set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            isEmailVerified: false,
            isLoading: false,
            error: null,
            isInitialized: true,
          });
          localStorage.removeItem("accessToken");
        }
      },

      // Clear all auth data (useful for debugging or role changes)
      clearAuthData: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          isEmailVerified: false,
          isLoading: false,
          error: null,
          isInitialized: true,
        });
        localStorage.removeItem("accessToken");
      },

      // Initialize auth state from localStorage
      initializeAuth: async () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          set({ accessToken: token, isAuthenticated: true, isLoading: true });
          try {
            // Try to get user profile to validate token
            const response = await authAPI.getProfile();
            set({
              user: response,
              isEmailVerified: response.emailVerified,
              isLoading: false,
              isInitialized: true,
            });
          } catch (error) {
            // Token is invalid, clear auth state
            set({
              user: null,
              accessToken: null,
              isAuthenticated: false,
              isEmailVerified: false,
              isLoading: false,
              isInitialized: true,
            });
            localStorage.removeItem("accessToken");
          }
        } else {
          // No token found, mark as initialized
          set({ isInitialized: true });
        }
      },

      // Check if user needs email verification
      needsEmailVerification: () => {
        const { user, isEmailVerified } = get();
        return user && !isEmailVerified;
      },

      // Check if user is admin
      isAdmin: () => {
        const { user } = get();
        return user?.role === "admin";
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
