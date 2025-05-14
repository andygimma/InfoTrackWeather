import { useState, useEffect } from "react";

import DailyWeather from "../DailyWeather/DailyWeather";
import HourlyWeather from "../HourlyWeather/HourlyWeather";
import weatherApi from "../../services/api/weatherApi";
import useWeatherApi from "../../hooks/useWeatherApi/useWeatherApi";

type WeatherDisplayProps = {
  location: {
    latitude: number;
    longitude: number;
  } | null;
};

const WeatherDisplay = ({ location }: WeatherDisplayProps) => {
  const { dailyWeather, error, hourlyWeather, loading } =
    useWeatherApi(location);

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
