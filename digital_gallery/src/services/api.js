import axios from "axios";

// Base URL for the API
const API_URL = "http://localhost:5000/api";

// Function to login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to signup
export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { name, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch paintings
export const fetchPaintings = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/images`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
