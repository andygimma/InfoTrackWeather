import { Routes, Route } from "react-router";

import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import LocationDetailsPage from "./pages/LocationDetailsPage";
import { WeatherProvider } from "./context/weatherContext";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <WeatherProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details" element={<LocationDetailsPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </WeatherProvider>
  );
}

export default App;
