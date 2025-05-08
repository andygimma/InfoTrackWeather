import { useEffect, useState } from "react";
import DailyWeather from "../components/DailyWeather/DailyWeather";
import HourlyWeather from "../components/HourlyWeather/HourlyWeather";
import useGeolocation from "../hooks/useGeolocation/useGeolocation";
import useReverseGeocode from "../hooks/useReverseGeocode/useReverseGeocode";
import weatherApi from "../services/api/weatherApi";
import LoadingDisplay from "../components/LoadingDisplay/LoadingDisplay";
import GeocodeLoading from "../components/Loading/GeocodeDisplay";

const HomePage = () => {
  const [hourlyWeather, setHourlyWeather] = useState<[]>([]);
  const [dailyWeather, setDailyWeather] = useState<[]>([]);

  const { loading, location, error, refresh } = useGeolocation();

  const {
    error: geocodeError,
    loading: geocodeLoading,
    address,
  } = useReverseGeocode(location);

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

  return (
    <div>
      <main>
        <GeocodeLoading
          loading={geocodeLoading}
          error={geocodeError}
          address={address}
        />
        <section className="md:flex w-full">
          <HourlyWeather
            hourlyWeather={hourlyWeather}
            label="Hourly Temperature"
          />
          <DailyWeather dailyWeather={dailyWeather} label="Daily Temperature" />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
