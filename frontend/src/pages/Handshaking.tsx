import { fetchViewerProfileAPI } from "@/api/viewer.api";
import { useAuth } from "@/hooks/useAuth";
import { useHandshaking } from "@/hooks/useHandshaking";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Handshaking = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { token } = useAuth();
  const {
    setId,
    setFirstName,
    setLastName,
    setEmail,
    setUsername,
    setCreatedAt,
    setProfilePictureUrl,
    userType,
  } = useHandshaking();

  const navigate = useNavigate();

  const handleHandshakingForViewer = async () => {
    setLoading(true);
    try {
      await fetchViewerProfileAPI(token!)
        .then((res) => {
          const viewer = res.data.viewer;
          setId(viewer.id);
          setFirstName(viewer.firstName);
          setLastName(viewer.lastName);
          setEmail(viewer.email);
          setUsername(viewer.username);
          setCreatedAt(viewer.createdAt);
          setProfilePictureUrl(viewer.profilePictureUrl);

          navigate("/");
        })
        .catch((error) => {
          console.log(error?.response?.data?.error);
          setError(error?.response?.data?.error);
        });
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userType === "VIEWER") {
      handleHandshakingForViewer();
    }
  }, [userType]);

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-black">
      {loading && (
        <Loader2 size={50} color="#45FF17" className="animate-spin" />
      )}
      {error && (
        <h1 className="text-3xl text-red-600 font-semibold font-jetbrains uppercase text-center">
          {error}
        </h1>
      )}
    </div>
  );
};

export default Handshaking;
