import { useState, useEffect } from "react";

import DailyWeather from "../DailyWeather/DailyWeather";
import HourlyWeather from "../HourlyWeather/HourlyWeather";
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
      setError(null);
      weatherApi(location?.latitude, location?.longitude)
        .then(([hourly, daily]) => {
          console.log({ hourly, daily });
          setLoading(false);
          setHourlyWeather(hourly);
          setDailyWeather(daily);
        })
        .catch((error) => {
          console.log({ error });
          setError(error);
          setLoading(false);
        });
    }
  }, [location]);

  if (loading) {
    return <div>Loading weather charts...</div>;
  }

  if (error) {
    return (
      <div className="underline text-red-700">
        Sorry, an error has occurred. Please try again.
      </div>
    );
  }
  return (
    <div className="w-full">
      <section className="md:flex items-center justify-center w-full">
        <HourlyWeather
          hourlyWeather={hourlyWeather}
          label="Hourly Temperature"
        />
        <DailyWeather
          dailyWeather={dailyWeather}
          label="Daily Highs and Lows"
        />
      </section>
    </div>
  );
};

export default WeatherDisplay;
