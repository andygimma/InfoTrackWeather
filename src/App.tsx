import { Routes, Route } from "react-router";

import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import LocationDetailsPage from "./pages/LocationDetailsPage";
import { WeatherProvider } from "./context/weatherContext";

function App() {
  return (
    <WeatherProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details" element={<LocationDetailsPage />} />
      </Routes>
    </WeatherProvider>
  );
}

export default App;
