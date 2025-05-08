import useGeolocation from "../hooks/useGeolocation/useGeolocation";
import useReverseGeocode from "../hooks/useReverseGeocode/useReverseGeocode";
import { useParams } from "react-router";
import GeocodeDisplay from "../components/Loading/GeocodeDisplay";
import WeatherDisplay from "../components/WeatherDisplay/WeatherDisplay";
import GeolocationDisplay from "../components/GeolocationDisplay/GeolocationDisplay";
import { useMemo } from "react";

const HomePage = () => {
  const params = useParams<{ lat: string; long: string }>();
  // const { loading, location, error, refresh } = useGeolocation();

  const location = useMemo(
    () => ({
      latitude: parseFloat(params.lat || "0"),
      longitude: parseFloat(params.long || "0"),
    }),
    [params.lat, params.long]
  );

  const {
    error: geocodeError,
    loading: geocodeLoading,
    address,
  } = useReverseGeocode(location);

  return (
    <div>
      <main className="px-10 py-10 flex flex-col items-center justify-center">
        <GeolocationDisplay
          loading={false}
          loadingMessage="Loading Geolocation..."
          error={null}
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
