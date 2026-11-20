import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const Handshaking = () => {
  const { token } = useAuth();

  useEffect(() => {
    console.log("Token: ", token);
  }, [token]);

  return <div>Handshaking</div>;
};

export default Handshaking;
