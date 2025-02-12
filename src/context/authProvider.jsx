import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { get, ref } from "firebase/database";
import toast from "react-hot-toast";

// Create authentication context
const AuthContext = createContext();

// AuthProvider component to manage authentication state
export function AuthProvider({ children }) {
  // State to store the authenticated user data
  const [user, setUser] = useState(undefined);

  // State to track loading status while checking authentication
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user data from Firebase Realtime Database
        const data = get(ref(db, `adminData/${user.uid}`));

        if ((await data).exists()) {
          const userData = (await data).val();

          // Check if the user's account is valid
          if (userData.isValid) {
            setUser(userData); // Set authenticated user data
          } else {
            // Show error toast if user is not validated
            toast.error("Your Account is not validated yet. Contact admin.");
            await signOut(auth); // Log out invalid users

            setUser(undefined);
          }
        } else {
          // Show error if user data is not found
          toast.error("User data not found. Contact Support");
          await signOut(auth); // Log out the user
          setUser(undefined);
        }
      } else {
        // No user is authenticated
        setUser(undefined);
      }
      setLoading(false); // Set loading to false after checking authentication
    });
    return () => unsubscribe(); // Cleanup authentication listener on unmount
  }, []);

  // Function to handle user logout
  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged Out"); // Show success message on logout
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

// Custom hook to access authentication context
export const useAuth = () => useContext(AuthContext);
