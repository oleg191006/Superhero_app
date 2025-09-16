import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import SuperheroesList from "./pages/SuperheroesList";
import SuperheroDetails from "./pages/SuperheroDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/heroes" replace />} />
        <Route path="/heroes" element={<SuperheroesList />} />
        <Route path="/heroes/:id" element={<SuperheroDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
