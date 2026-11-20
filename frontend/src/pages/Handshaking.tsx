import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const Handshaking = () => {
  const { token, logout } = useAuth();

  useEffect(() => {
    console.log("Token: ", token);
  }, [token]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1 onClick={handleLogout}>Handshaking</h1>
    </div>
  );
};

export default Handshaking;
