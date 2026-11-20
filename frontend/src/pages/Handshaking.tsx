import { useAuth } from "@/hooks/useAuth";
import { useHandshaking } from "@/hooks/useHandshaking";
import { useEffect } from "react";

const Handshaking = () => {
  const { token, logout } = useAuth();
  const { userType } = useHandshaking();

  useEffect(() => {
    console.log("Token: ", token);
  }, [token]);

  useEffect(() => {
    console.log("User Type: ", userType);
  }, [userType]);

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
