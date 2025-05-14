import { useState, useEffect } from "react";

import weatherApi from "../../services/api/weatherApi";

type GeoLocation = {
  latitude: number;
  longitude: number;
} | null;

export default function useWeatherApi(location: GeoLocation) {
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

  return { dailyWeather, error, hourlyWeather, loading };
}
