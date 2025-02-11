import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { fetchToken } from "../../services/AuthServiceHttp";
import { jwtDecode } from "jwt-decode";

type JWTTokenType = {
  email: string;
  given_name: string;
  family_name: string;
  sub: string;
};
export const LoginCallBack = () => {
  const params = new URLSearchParams(window.location.search);
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  if (!params.get("code")) {
    return <Navigate to={"/"} />;
  }

  useEffect(() => {
    const fetchIdToken = async () => {
      const code = params.get("code");

      if (code) {
        try {
          console.log("Authorization Code:", code);
          const result = await fetchToken(code);
          const token = result.id_token;
          console.log(token);
          const { email, given_name, family_name, sub } =
            jwtDecode<JWTTokenType>(token);
          setAuthData(token, email, given_name, family_name, sub);
          return navigate("/home");
        } catch (err) {
          console.log(`Error: ${err}`);
        }
      }

      navigate("/");
    };

    fetchIdToken();
  }, []);

  return <div>Processing Login...</div>;
};
