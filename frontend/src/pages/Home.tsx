import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useHandshaking } from "@/hooks/useHandshaking";

const Home = () => {
  const { id, firstName, lastName, createdAt, userType, reset } =
    useHandshaking();
  const { logout, token } = useAuth();

  const handleLogout = () => {
    logout();
    reset();
  };
  return (
    <div className="flex flex-col justify-start items-start gap-y-3">
      <h1>{id}</h1>
      <h1>{firstName}</h1>
      <h1>{lastName}</h1>
      <h1>{userType}</h1>
      <h1>{createdAt}</h1>
      <h1>{token}</h1>

      <Button onClick={handleLogout}>Log Out</Button>
    </div>
  );
};

export default Home;
