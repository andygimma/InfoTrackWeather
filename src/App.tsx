import Navbar from "./components/Navbar/Navbar";
import useGeoLocation from "./hooks/useGeolocation/useGeolocation";

function App() {
  const { loading, location, error, refresh } = useGeoLocation();
  return (
    <div>
      <Navbar />
      <main className="pt-20 px-8">
        {loading && <p>Please allow location services</p>}
        <p>
          Location: {location?.latitude} {location?.longitude}
        </p>
        {error && <p>Error: {error}</p>}
      </main>
    </div>
  );
}

export default App;
