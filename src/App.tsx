import { Routes, Route, useParams } from "react-router";

import Navbar from "./components/Navbar/Navbar";

import HomePage from "./pages/HomePage";
import LocationDetailsPage from "./pages/LocationDetailsPage";
import { WeatherProvider } from "./context/weatherContext";
import SearchPage from "./pages/SearchPage";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  return (
    <WeatherProvider>
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details" element={<LocationDetailsPage />} />
        <Route path="/search/:lat/:long" element={<SearchPage />} />
      </Routes>
    </WeatherProvider>
  );
}

export default App;
