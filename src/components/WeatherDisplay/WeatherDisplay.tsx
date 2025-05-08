import { useState, useEffect } from "react";
import HourlyWeather from "../HourlyWeather/HourlyWeather";
import DailyWeather from "../DailyWeather/DailyWeather";
import weatherApi from "../../services/api/weatherApi";

type WeatherDisplayProps = {
  location: {
    latitude: number;
    longitude: number;
  } | null;
};

const WeatherDisplay = ({ location }: WeatherDisplayProps) => {
  const [hourlyWeather, setHourlyWeather] = useState<[]>([]);
  const [dailyWeather, setDailyWeather] = useState<[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location) {
      setLoading(true);
      weatherApi(location?.latitude, location?.longitude)
        .then(([hourly, daily]) => {
          setLoading(false);
          setHourlyWeather(hourly);
          setDailyWeather(daily);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [location]);

  if (loading) {
    return <div>Loading weather charts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <section className="md:flex w-full">
        <HourlyWeather
          hourlyWeather={hourlyWeather}
          label="Hourly Temperature"
        />
        <DailyWeather dailyWeather={dailyWeather} label="Daily Temperature" />
      </section>
    </div>
  );
};

export default WeatherDisplay;
