import { useEffect, useState } from "react";
import DailyWeather from "../components/DailyWeather/DailyWeather";
import HourlyWeather from "../components/HourlyWeather/HourlyWeather";
import useGeolocation from "../hooks/useGeolocation/useGeolocation";
import useReverseGeocode from "../hooks/useReverseGeocode/useReverseGeocode";
import GeocodeDisplay from "../components/Loading/GeocodeDisplay";
import WeatherDisplay from "../components/WeatherDisplay/WeatherDisplay";
import GeolocationDisplay from "../components/GeolocationDisplay/GeolocationDisplay";

const HomePage = () => {
  const { loading, location, error, refresh } = useGeolocation();

  const {
    error: geocodeError,
    loading: geocodeLoading,
    address,
  } = useReverseGeocode(location);

  return (
    <div>
      <main>
        <GeolocationDisplay
          loading={loading}
          error={error}
          location={location}
        />
        <GeocodeDisplay
          loading={geocodeLoading}
          error={geocodeError}
          address={address}
        />

        <WeatherDisplay location={location} />
      </main>
    </div>
  );
};

export default HomePage;
