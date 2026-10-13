import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

const STORAGE_KEY_USER = 'ren_auth_user';
const STORAGE_PREFIX_WISHLIST = 'ren_wishlist_';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin');
  const [pendingWishlistSlug, setPendingWishlistSlug] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Restore user session on mount
  useEffect(() => {
    try {
      const savedUserStr = localStorage.getItem(STORAGE_KEY_USER);
      if (savedUserStr) {
        const parsedUser = JSON.parse(savedUserStr);
        setUser(parsedUser);

        // Load wishlist for this specific user
        const userWishlistKey = `${STORAGE_PREFIX_WISHLIST}${parsedUser.email.toLowerCase()}`;
        const savedWishlistStr = localStorage.getItem(userWishlistKey);
        if (savedWishlistStr) {
          setWishlist(JSON.parse(savedWishlistStr));
        }
      }
    } catch (e) {
      console.error('Failed to restore session from localStorage:', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const saveUserWishlist = (email, items) => {
    try {
      const userWishlistKey = `${STORAGE_PREFIX_WISHLIST}${email.toLowerCase()}`;
      localStorage.setItem(userWishlistKey, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save wishlist:', e);
    }
  };

  const openAuthModal = (mode = 'signin', targetWishlistSlug = null) => {
    setAuthModalMode(mode);
    if (targetWishlistSlug) {
      setPendingWishlistSlug(targetWishlistSlug);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPendingWishlistSlug(null);
  };

  const handlePostAuthSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(authenticatedUser));

    const userWishlistKey = `${STORAGE_PREFIX_WISHLIST}${authenticatedUser.email.toLowerCase()}`;
    let existingWishlist = [];
    try {
      const saved = localStorage.getItem(userWishlistKey);
      if (saved) {
        existingWishlist = JSON.parse(saved);
      }
    } catch (e) {
      existingWishlist = [];
    }

    if (pendingWishlistSlug && !existingWishlist.includes(pendingWishlistSlug)) {
      existingWishlist = [...existingWishlist, pendingWishlistSlug];
      saveUserWishlist(authenticatedUser.email, existingWishlist);
    }

    setWishlist(existingWishlist);
    setIsAuthModalOpen(false);
    setPendingWishlistSlug(null);
  };

  const signIn = (email, name) => {
    const defaultName = name || email.split('@')[0].replace(/[._]/g, ' ');
    const formattedName = defaultName.charAt(0).toUpperCase() + defaultName.slice(1);
    const authenticatedUser = {
      id: 'usr_' + Date.now().toString(36),
      email: email.trim().toLowerCase(),
      name: formattedName
    };
    handlePostAuthSuccess(authenticatedUser);
  };

  const signUp = (name, email) => {
    const authenticatedUser = {
      id: 'usr_' + Date.now().toString(36),
      name: name.trim(),
      email: email.trim().toLowerCase()
    };
    handlePostAuthSuccess(authenticatedUser);
  };

  const signOut = () => {
    setUser(null);
    setWishlist([]);
    localStorage.removeItem(STORAGE_KEY_USER);
  };

  const toggleWishlist = (propertySlug) => {
    if (!user) {
      openAuthModal('signin', propertySlug);
      return false;
    }

    const alreadyInWishlist = wishlist.includes(propertySlug);
    let updated;
    if (alreadyInWishlist) {
      updated = wishlist.filter(slug => slug !== propertySlug);
    } else {
      updated = [...wishlist, propertySlug];
    }

    setWishlist(updated);
    saveUserWishlist(user.email, updated);
    return !alreadyInWishlist;
  };

  const isInWishlist = (propertySlug) => {
    return wishlist.includes(propertySlug);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        wishlist,
        isAuthModalOpen,
        authModalMode,
        pendingWishlistSlug,
        openAuthModal,
        closeAuthModal,
        signIn,
        signUp,
        signOut,
        toggleWishlist,
        isInWishlist
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
