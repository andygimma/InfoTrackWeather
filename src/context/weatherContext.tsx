import { createContext, useContext, useState, useEffect } from "react";
import useGeolocation from "../hooks/useGeolocation/useGeolocation";
import weatherApi from "../services/api/weatherApi";
import useReverseGeocode from "../hooks/useReverseGeocode/useReverseGeocode";

type Address = {
  city: string;
  state: string;
} | null;

type defaultStateType = {
  address: Address;
  hourlyWeather: [];
  dailyWeather: [];
  loading: boolean;
  error: string | null;
  geocodeError: string | null;
  geocodeLoading: boolean;
};
const defaultState: defaultStateType = {
  address: null,
  hourlyWeather: [],
  dailyWeather: [],
  loading: false,
  error: "",
  geocodeError: "",
  geocodeLoading: false,
};

const WeatherContext = createContext(defaultState);

export const WeatherProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { loading, location, error, refresh } = useGeolocation();

  const [hourlyWeather, setHourlyWeather] = useState<[]>([]);
  const [dailyWeather, setDailyWeather] = useState<[]>([]);

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
    <WeatherContext.Provider
      value={{
        address,
        hourlyWeather,
        dailyWeather,
        loading,
        error,
        geocodeError,
        geocodeLoading,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export function useWeather() {
  return useContext(WeatherContext);
}
