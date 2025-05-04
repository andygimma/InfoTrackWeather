import { Routes, Route } from "react-router";

import Navbar from "./components/Navbar/Navbar";
// import useGeolocation from "./hooks/useGeolocation/useGeolocation";
import HomePage from "./pages/HomePage";
import LocationDetailsPage from "./pages/LocationDetailsPage";

function App() {
  // const { loading, location, error, refresh } = useGeolocation();
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details" element={<LocationDetailsPage />} />
      </Routes>
      {/* <main className="pt-20 px-8">
        {loading && <p>Please allow location services</p>}
        <p>
          Location: {location?.latitude} {location?.longitude}
        </p>
        {error && <p>Error: {error}</p>}
      </main> */}
    </div>
  );
}

export default App;
