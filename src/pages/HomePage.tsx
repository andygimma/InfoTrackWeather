import { useEffect, useState } from "react";
import useGeolocation from "../hooks/useGeolocation/useGeolocation";
import useReverseGeocode from "../hooks/useReverseGeocode/useReverseGeocode";
import weatherApi from "../services/api/weatherApi";

const HomePage = () => {
  const { loading, location, error, refresh } = useGeolocation();

  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [dailyWeather, setDailyWeather] = useState([]);

  useEffect(() => {
    if (location) {
      weatherApi(location?.latitude, location?.longitude).then(
        ([hourly, daily]) => {
          setHourlyWeather(hourly);
          setDailyWeather(daily);
        }
      );
    }
  }, [location]);

  const {
    error: geocodeError,
    loading: geocodeLoading,
    address,
  } = useReverseGeocode(location);

  return (
    <div>
      <main>
        {loading && <p>Please allow location services</p>}
        <p>
          Location: {address?.city}, {address?.state}
        </p>
        {error && <p>Error: {error}</p>}
      </main>
    </div>
  );
};

export default HomePage;
