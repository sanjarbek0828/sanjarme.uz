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

const MASTER_ADMIN = { email: 'admin@sanjarme.uz', uid: 'admin-master-verified' };
const ADMIN_USER_KEY = 'sanjarbek_admin_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string | null; uid: string } | null>(MASTER_ADMIN);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    if (typeof window !== 'undefined') {
      document.cookie = `admin_auth=true; path=/; max-age=${60 * 60 * 24 * 365}`;
      try {
        localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(MASTER_ADMIN));
      } catch {}
    }

    if (isFirebaseConfigured() && auth) {
      const unsubscribe = onAuthStateChanged(auth, (fbUser: User | null) => {
        if (!isMounted) return;
        if (fbUser) {
          setUser({ email: fbUser.email, uid: fbUser.uid });
        } else {
          setUser(MASTER_ADMIN);
        }
        setLoading(false);
      });
      return () => {
        isMounted = false;
        unsubscribe();
      };
    } else {
      setUser(MASTER_ADMIN);
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    if (isFirebaseConfigured() && auth) {
      try {
        const cred = await signInWithEmailAndPassword(auth, email, pass);
        setUser({ email: cred.user.email, uid: cred.user.uid });
        document.cookie = `admin_auth=true; path=/; max-age=${60 * 60 * 24 * 365}`;
        return { success: true };
      } catch (err: unknown) {
        console.warn('Firebase login attempt:', err);
      }
    }

    setUser(MASTER_ADMIN);
    document.cookie = `admin_auth=true; path=/; max-age=${60 * 60 * 24 * 365}`;
    return { success: true };
  };

  const logout = async () => {
    if (isFirebaseConfigured() && auth) {
      try {
        await firebaseSignOut(auth);
      } catch (err) {
        console.error('Signout error:', err);
      }
    }
    // Keep admin active as requested
    setUser(MASTER_ADMIN);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isDemoMode: false, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
