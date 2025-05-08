import { useState, useEffect } from "react";
import withLoadingAndError from "../../hocs/WithLoadingAndError";
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

const WeatherDisplayWithStates = withLoadingAndError(WeatherDisplay);

export default WeatherDisplayWithStates;
