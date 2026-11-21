import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import AdminAuthentication from "./pages/AdminAuthentication";
import Handshaking from "./pages/Handshaking";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/authentication" element={<Authentication />} />
        <Route
          path="/authentication/author"
          element={<AdminAuthentication />}
        />
        <Route path="/authentication/handshake" element={<Handshaking />} />

        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
