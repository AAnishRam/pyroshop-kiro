"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  signInWithPopup,
  sendPasswordResetEmail,
  updateEmail as firebaseUpdateEmail,
  updatePassword as firebaseUpdatePassword,
  updateProfile,
  deleteUser,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import { FirebaseError } from "firebase/app";

// Types
type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  updateDisplayName: (displayName: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName });
      toast.success("Account created successfully!");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Signed in successfully!");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google!");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success("Signed out successfully!");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  };

  const updateEmail = async (email: string) => {
    try {
      if (user) {
        await firebaseUpdateEmail(user, email);
        toast.success("Email updated successfully!");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  };

  const changePassword = async (newPassword: string) => {
    try {
      if (user) {
        await firebaseUpdatePassword(user, newPassword);
        toast.success("Password updated successfully!");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  };

  const updateUserProfile = async (displayName: string) => {
    try {
      if (user) {
        await updateProfile(user, { displayName });
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  };

  const deleteAccount = async () => {
    try {
      if (user) {
        await deleteUser(user);
        toast.success("Account deleted successfully!");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      throw error;
    }
  };

  const value: AuthContextType = {
    currentUser: user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updateEmail,
    updatePassword: changePassword,
    updateDisplayName: updateUserProfile,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
