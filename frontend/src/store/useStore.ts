import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
}

interface LanguageState {
  language: 'en' | 'ar';
  setLanguage: (language: 'en' | 'ar') => void;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
}

interface SidebarState {
  isExpanded: boolean;
  toggleSidebar: () => void;
  setExpanded: (expanded: boolean) => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Mock function for authentication
const mockAuth = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password') {
        resolve({
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test'
        });
      } else {
        // For the demo, we'll accept any credentials
        resolve({
          id: Math.random().toString(36).substring(2, 9),
          name: email.split('@')[0],
          email: email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        });
      }
    }, 1000);
  });
};

// Theme store with persistence
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    { name: 'linkify-theme' }
  )
);

// Language store with persistence
export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
    }),
    { name: 'linkify-language' }
  )
);

// Auth store with localStorage persistence
export const useAuthStore = create<AuthState>((set) => {
  // Initialize from localStorage if available
  const storedUser = localStorage.getItem('linkify_user');
  const initialState = storedUser 
    ? { isAuthenticated: true, user: JSON.parse(storedUser) }
    : { isAuthenticated: false, user: null };

  return {
    ...initialState,
    login: async (email, password) => {
      const res = await fetch('/api/auth/login', {
   method: 'POST',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({ email, password }),
 });
 const data = await res.json();
 if (!res.ok) throw new Error(data.msg || 'Login failed');

 // backend should return { token, user: { id, username, email } }
 const { token, user } = data;
 localStorage.setItem('linkify_token', token);
 set({ isAuthenticated: true, user });
 localStorage.setItem('linkify_user', JSON.stringify(user));
    },
    register: async (email, password, username) => {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.msg || 'Registration failed');
},
    logout: () => {
      localStorage.removeItem('linkify_user');
      set({ isAuthenticated: false, user: null });
    }
  };
});

// Sidebar store
export const useSidebarStore = create<SidebarState>()((set) => ({
  isExpanded: true,
  toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
  setExpanded: (expanded) => set({ isExpanded: expanded })
}));
