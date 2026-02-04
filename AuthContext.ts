
import { createContext } from 'react';

// Define a local User type to replace the one from Firebase
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  username?: string;
  bio?: string;
  photoURL?: string | null;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});
