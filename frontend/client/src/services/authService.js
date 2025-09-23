// File: frontend/client/src/services/authService.js

// This file handles all API calls related to user authentication

// The base URL of your backend API
const API_URL = 'https://3czzqk3l-5000.use2.devtunnels.ms/api/auth/';

/**
 * Registers a new user by sending a POST request to the backend.
 * @param {object} userData - The user's registration data (name, email, password, role).
 * @returns {Promise<object>} - A promise that resolves with the user data upon successful registration.
 */
const register = async (userData) => {
  try {
    const response = await fetch(API_URL + 'register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to register user');
    }

    const data = await response.json();
    // Save user data to localStorage
    if (data.token) {
      localStorage.setItem('user', JSON.stringify(data));
    }

    return data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

/**
 * Authenticates a user by sending a POST request to the backend.
 * @param {object} userData - The user's login credentials (email, password).
 * @returns {Promise<object>} - A promise that resolves with the user data upon successful login.
 */
const login = async (userData) => {
  try {
    const response = await fetch(API_URL + 'login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to log in');
    }

    const data = await response.json();
    // Save user data and admin status to localStorage
    if (data.token) {
      localStorage.setItem('user', JSON.stringify(data)); // This might be 'jwtToken' for berrymart
      // For berrymart-ecommerce: Check the 'role' and set 'isAdmin' accordingly
      localStorage.setItem('isAdmin', data.role === 'admin');
    }

    return data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export default {
  register,
  login,
};
