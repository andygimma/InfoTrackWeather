import Navbar from "./components/Navbar";
import useGeoLocation from "./hooks/useGeolocation/useGeolocation";

function App() {
  const { loading, location, error, refresh } = useGeoLocation();
  return (
    <div>
      <Navbar />
      <main className="pt-20 px-8">
        <p>Loading: {loading}</p>
        <p>
          Location: {location?.latitude} {location?.longitude}
        </p>
        <p>Error: {error}</p>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </main>
    </div>
  );
}

export default App;
