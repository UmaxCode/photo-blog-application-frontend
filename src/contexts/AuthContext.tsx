import { jwtDecode, JwtPayload } from "jwt-decode";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextProps {
  idToken: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  sub: string | null;
  setAuthData: (
    idToken: string,
    email: string,
    firstName: string,
    lastName: string,
    sub: string
  ) => void;
  clearAuthData: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [idToken, setIdToken] = useState<string | null>(
    sessionStorage.getItem("id_token")
  );
  const [email, setEmail] = useState<string | null>(
    sessionStorage.getItem("email")
  );

  const [firstName, setFirstName] = useState<string | null>(
    sessionStorage.getItem("first_name")
  );

  const [lastName, setLastName] = useState<string | null>(
    sessionStorage.getItem("last_name")
  );

  const [sub, setSub] = useState<string | null>(sessionStorage.getItem("sub"));

  const setAuthData = (
    idToken: string,
    email: string,
    firstName: string,
    lastName: string,
    sub: string
  ) => {
    setIdToken(idToken);
    setEmail(email);
    setFirstName(firstName);
    setLastName(lastName);
    sessionStorage.setItem("id_token", idToken);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("first_name", firstName);
    sessionStorage.setItem("last_name", lastName);
    sessionStorage.setItem("sub", sub);
  };

  const clearAuthData = () => {
    setIdToken(null);
    setEmail(null);
    setFirstName(null);
    setLastName(null);
    setSub(null);
    sessionStorage.removeItem("id_token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("first_name");
    sessionStorage.removeItem("last_name");
    sessionStorage.removeItem("sub");
  };

  // Logout when the token expires or id_token is missing
  useEffect(() => {
    const checkTokenValidity = () => {
      const token = sessionStorage.getItem("id_token");

      if (isTokenExpired(token)) {
        clearAuthData();
      }
    };

    // Set an interval to check token validity periodically
    const interval = setInterval(checkTokenValidity, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <AuthContext.Provider
      value={{
        idToken,
        email,
        firstName,
        lastName,
        sub,
        setAuthData,
        clearAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Function to check if a JWT is expired
const isTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    if (!exp) return true; // If no expiry, consider it invalid
    return Date.now() >= exp * 1000; // Compare current time with expiry time
  } catch (e) {
    return true; // If there's an error decoding, consider it expired
  }
};
