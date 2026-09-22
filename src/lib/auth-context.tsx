'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebase';

interface AuthContextType {
  user: { email: string | null; uid: string } | null;
  loading: boolean;
  isDemoMode: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isDemoMode: true,
  login: async () => ({ success: false }),
  logout: async () => {},
});

const DEMO_USER_KEY = 'sanjarbek_admin_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string | null; uid: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isDemo = !isFirebaseConfigured();

  useEffect(() => {
    let isMounted = true;

    if (isFirebaseConfigured() && auth) {
      const unsubscribe = onAuthStateChanged(auth, (fbUser: User | null) => {
        if (!isMounted) return;
        if (fbUser) {
          setUser({ email: fbUser.email, uid: fbUser.uid });
          document.cookie = `admin_auth=true; path=/; max-age=${60 * 60 * 24 * 7}`;
        } else {
          // Check local demo session fallback
          const localSession = typeof window !== 'undefined' ? localStorage.getItem(DEMO_USER_KEY) : null;
          if (localSession) {
            try {
              setUser(JSON.parse(localSession));
              document.cookie = `admin_auth=true; path=/; max-age=${60 * 60 * 24 * 7}`;
            } catch {
              setUser(null);
            }
          } else {
            setUser(null);
            document.cookie = 'admin_auth=; path=/; max-age=0';
          }
        }
        setLoading(false);
      });
      return () => {
        isMounted = false;
        unsubscribe();
      };
    } else {
      // Local demo mode: defer to avoid synchronous render waterfall
      const timer = setTimeout(() => {
        if (!isMounted) return;
        const localSession = typeof window !== 'undefined' ? localStorage.getItem(DEMO_USER_KEY) : null;
        if (localSession) {
          try {
            setUser(JSON.parse(localSession));
            document.cookie = `admin_auth=true; path=/; max-age=${60 * 60 * 24 * 7}`;
          } catch {
            setUser(null);
          }
        }
        setLoading(false);
      }, 0);

      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    }
  }, []);

  const login = async (email: string, pass: string) => {
    // 1. Try Firebase Auth if configured
    if (isFirebaseConfigured() && auth) {
      try {
        const cred = await signInWithEmailAndPassword(auth, email, pass);
        setUser({ email: cred.user.email, uid: cred.user.uid });
        document.cookie = `admin_auth=true; path=/; max-age=${60 * 60 * 24 * 7}`;
        return { success: true };
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Authentication failed';
        console.warn('Firebase login failed, checking fallback credentials:', errorMsg);
      }
    }

    // 2. Demo / Dev credentials fallback
    // Matches admin@sanjarme.uz, admin@sanjarbek.dev or demo mode credentials
    if (
      (email.toLowerCase() === 'admin@sanjarme.uz' && pass === 'admin123456') ||
      (email.toLowerCase() === 'admin@sanjarbek.dev' && pass === 'admin123456') ||
      (email.toLowerCase() === 'admin@portfolio.dev' && pass === 'admin123456') ||
      (email.toLowerCase() === 'sanjarbek@admin.dev' && pass === 'admin123456')
    ) {
      const mockUser = { email, uid: 'admin-local-master' };
      setUser(mockUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem(DEMO_USER_KEY, JSON.stringify(mockUser));
      }
      document.cookie = `admin_auth=true; path=/; max-age=${60 * 60 * 24 * 7}`;
      return { success: true };
    }

    return { 
      success: false, 
      error: 'Invalid credentials. For quick demo access, use admin@sanjarme.uz with password admin123456' 
    };
  };

  const logout = async () => {
    if (isFirebaseConfigured() && auth) {
      try {
        await firebaseSignOut(auth);
      } catch (err) {
        console.error('Firebase signout error:', err);
      }
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem(DEMO_USER_KEY);
    }
    document.cookie = 'admin_auth=; path=/; max-age=0';
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isDemoMode: isDemo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
