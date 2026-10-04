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
  login: (emailOrUsername: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isDemoMode: false,
  login: async () => ({ success: false }),
  logout: async () => {},
});

const ADMIN_USER_KEY = 'sanjarbek_admin_session';

// Master admin logins and passwords allowed
const ALLOWED_LOGINS = ['admin@sanjarme.uz', 'sanjarbek', 'admin', 'sanjar'];
const DEFAULT_MASTER_PASSWORDS = ['admin123456', 'sanjar2026'];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string | null; uid: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    // Check existing local session first
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(ADMIN_USER_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.email) {
            setUser(parsed);
          }
        }
      } catch (err) {
        console.warn('Error reading admin session from localStorage:', err);
      }
    }

    // Check Firebase Auth if configured
    if (isFirebaseConfigured() && auth) {
      const unsubscribe = onAuthStateChanged(auth, (fbUser: User | null) => {
        if (!isMounted) return;
        if (fbUser) {
          const userData = { email: fbUser.email, uid: fbUser.uid };
          setUser(userData);
          try {
            localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(userData));
            document.cookie = `admin_auth=true; path=/; max-age=${60 * 60 * 24 * 7}`;
          } catch {}
        }
        setLoading(false);
      });

      return () => {
        isMounted = false;
        unsubscribe();
      };
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (emailOrUsername: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const normIdentifier = (emailOrUsername || '').trim().toLowerCase();
    const cleanPass = (pass || '').trim();

    if (!normIdentifier || !cleanPass) {
      return { success: false, error: 'Login va parolni kiriting!' };
    }

    // 1. Try Firebase Auth if email format and Firebase is available
    if (isFirebaseConfigured() && auth && normIdentifier.includes('@')) {
      try {
        const cred = await signInWithEmailAndPassword(auth, normIdentifier, cleanPass);
        const userData = { email: cred.user.email, uid: cred.user.uid };
        setUser(userData);
        if (typeof window !== 'undefined') {
          localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(userData));
          document.cookie = `admin_auth=true; path=/; max-age=${60 * 60 * 24 * 7}`;
        }
        return { success: true };
      } catch (err: unknown) {
        console.warn('Firebase login attempt:', err);
      }
    }

    // 2. Validate against Master Admin credentials
    const envPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    const isLoginValid = ALLOWED_LOGINS.includes(normIdentifier);
    const isPasswordValid = 
      DEFAULT_MASTER_PASSWORDS.includes(cleanPass) || 
      (Boolean(envPass) && cleanPass === envPass);

    if (isLoginValid && isPasswordValid) {
      const userData = {
        email: normIdentifier.includes('@') ? normIdentifier : 'admin@sanjarme.uz',
        uid: 'admin-master-verified',
      };
      setUser(userData);
      if (typeof window !== 'undefined') {
        localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(userData));
        document.cookie = `admin_auth=true; path=/; max-age=${60 * 60 * 24 * 7}`;
      }
      return { success: true };
    }

    return { 
      success: false, 
      error: "Login yoki parol noto'g'ri! Iltimos, ma'lumotlarni qayta tekshiring." 
    };
  };

  const logout = async () => {
    if (isFirebaseConfigured() && auth) {
      try {
        await firebaseSignOut(auth);
      } catch (err) {
        console.error('Signout error:', err);
      }
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(ADMIN_USER_KEY);
        document.cookie = 'admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0';
      } catch {}
    }

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isDemoMode: false, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
