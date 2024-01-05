import { User } from "./types";
import { jwtDecode } from "jwt-decode";

// Hardcoded authenticated user data for Edsger Dijkstra
// const authenticatedUser: User = {
//   id: "u1",
//   username: "edsger",
//   displayName: "Edsger Dijkstra",
//   avatar: "edsger-dijkstra.webp",
// };

export const getAuthenticatedUser = (): User => {
  const token = localStorage.getItem('token') as string;
  const decoded = jwtDecode<User>(token);
  return decoded;
};

export const getAuthenticatedUserToken = (): string | null => {
  return localStorage.getItem('token');
};

export const setAuthenticatedUserToken = (token: string) => {
  localStorage.setItem('token', token);
};

// Store the token in local storage
export const storeAuthenticatedUserToken = (token: string): void => {
  localStorage.setItem("token", token);
};

// Remove the token from local storage
export const removeAuthenticatedUserToken = (): void => {
  localStorage.removeItem("token");
};

// Function to check if the token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    const currentTimestamp = Date.now() / 1000; // current time in seconds
    return decodedToken.exp < currentTimestamp;
  } catch (error) {
    // If there's an error in decoding, assume the token is invalid/expired
    return true;
  }
};
