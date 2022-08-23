import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  getAuth,
  User,
  signOut as logout,
} from "firebase/auth";
import { app } from "../firebaseConfig";

const auth = getAuth(app);

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const signOut = async () => await logout(auth);

  return { user, loading, signOut };
};

export default useAuth;
