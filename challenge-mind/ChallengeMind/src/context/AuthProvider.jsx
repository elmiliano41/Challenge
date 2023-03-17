import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import AxiosClient from "../config/AxiosClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { userToken: token, isAdmin: false } : { isAdmin: false }; 
  });
  
  
  
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await AxiosClient.get("/auth", config);
        setAuth(data);
      } catch (error) {
        setAuth({});
        console.log(error);
      }
      setLoading(false);
    };
    authUser();
  }, []);

  const closeSessionAuth = () => {
    setAuth({})
  }
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        setLoading,
        closeSessionAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
