import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Authentication from "./pages/Authentication";
import AdminAuthentication from "./pages/AdminAuthentication";
import Handshaking from "./pages/Handshaking";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/authentication" element={<Authentication />} />
        <Route
          path="/authentication/author"
          element={<AdminAuthentication />}
        />
        <Route path="/authentication/handshake" element={<Handshaking />} />
      </Routes>
    </Router>
  );
};

export default App;
