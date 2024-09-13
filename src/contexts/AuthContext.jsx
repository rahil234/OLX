import React, { createContext, useState, useEffect, useRef } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import {
  setDoc,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [userFavorites, setUserFavorites] = useState(["sTra2YcVSYPpU8VituG4"]);
  const [userAds, setUserAds] = useState(["sTra2YcVSYPpU8VituG4"]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) setIsVisible(false);

      console.log(user);

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setError("Invalid credentials. Please check and try again.");
      } else {
        setError(error.code);
      }
    }
  };

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        createdAt: new Date(),
      });
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Invalid Email. Please check and try again.");
      }
      console.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleFavorite = async (productId) => {
    if (!user) {
      setError("User not authenticated");
      return;
    }

    const userDocRef = doc(db, "users", user.uid);

    try {
      // Check if the product is already in the favorites
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();
      const isFavorite = userData?.favorites?.includes(productId);

      if (isFavorite) {
        // Remove from favorites
        await updateDoc(userDocRef, {
          favorites: arrayRemove(productId),
        });
      } else {
        // Add to favorites
        await updateDoc(userDocRef, {
          favorites: arrayUnion(productId),
        });
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
      setError("Error updating favorites");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        error,
        isVisible,
        setIsVisible,
        setError,
        toggleFavorite,
        userFavorites,
        setUserFavorites,
        userAds,
        setUserAds,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
