import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import PollPage from "./pages/PollPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poll/:id" element={<PollPage />} />
      </Routes>
    </Router>
  );
}