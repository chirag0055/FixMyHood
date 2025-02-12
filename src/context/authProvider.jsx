import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { get, ref } from "firebase/database";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = get(ref(db, `adminData/${user.uid}`));
        if ((await data).exists()) {
          const userData = (await data).val();
          if (userData.isValid) {
            setUser(userData);
          } else {
            toast.error("Your Account is not validated yet. Contact admin.");
            await signOut(auth); //Logout Invalid users
            setUser(undefined);
          }
        } else {
          toast.error("User data not found. Contact Support");
          await signOut(auth);
          setUser(undefined);
        }
      } else {
        setUser(undefined);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged Out");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {!loading && children} {/* Render only when loading is complete */}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
