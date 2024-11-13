import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app } from "@/firebase/firebase.config";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null); // Initialize as null
  const axiosPublic = useAxiosPublic();
const [error, setError] = useState("")
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const res = await axiosPublic.post('/users/signIn', { email, password });
      if (res.data.success) {
        setUserData(res.data.data); // Set userData from response
        localStorage.setItem('access-token', res.data.token)
        localStorage.setItem('userId', res.data.data._id)
        localStorage.setItem('userEmail', res.data.data.email)
        return signInWithEmailAndPassword(auth, email, password);
      }
      
    } catch (err) {
      setError(err.response.data.message, 'proicder');
    }
    
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Fetch user data if currentUser exists
        try {
          const response = await axiosPublic.get(`/users/${currentUser.email}`); // Example endpoint
          if (response.data.success) {
            setUserData(response.data.data);
            console.log(response.data.data); // Now this should log the updated user data
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        // Clear user data when signed out
        setUserData(null);
        localStorage.removeItem('access-token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
       
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user, error, 
    userData, // Include userData in context
    loading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
