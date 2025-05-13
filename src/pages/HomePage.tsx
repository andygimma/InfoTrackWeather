import useGeolocation from "../hooks/useGeolocation/useGeolocation";
import useReverseGeocode from "../hooks/useReverseGeocode/useReverseGeocode";
import GeocodeDisplay from "../components/Loading/GeocodeDisplay";
import WeatherDisplay from "../components/WeatherDisplay/WeatherDisplay";
import GeolocationDisplay from "../components/GeolocationDisplay/GeolocationDisplay";

const HomePage = () => {
  const { loading, location, error } = useGeolocation();

  const {
    error: geocodeError,
    loading: geocodeLoading,
    address,
  } = useReverseGeocode(location);

  return (
    <div>
      <main className="px-10 py-10 flex flex-col items-center justify-center">
        <h1 className="text-3xl">Welcome to InfoTrack Weather</h1>
        {loading && (
          <p className="underline">
            Please allow location information so that you can see your local
            weather.
          </p>
        )}

        {error && <p>Error: {error}</p>}

        <GeolocationDisplay
          loading={loading}
          loadingMessage="Loading Geolocation..."
          error={error}
          location={location}
        />
        <GeocodeDisplay
          loading={geocodeLoading}
          loadingMessage="Loading Address..."
          error={geocodeError}
          address={address}
        />
        <WeatherDisplay location={location} />
      </main>
    </div>
  );
};

export default HomePage;
