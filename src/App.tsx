import { Routes, Route } from "react-router";

import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import LocationDetailsPage from "./pages/LocationDetailsPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details" element={<LocationDetailsPage />} />
      </Routes>
    </>
  );
}

export default App;
