import DailyWeather from "../components/DailyWeather/DailyWeather";
import HourlyWeather from "../components/HourlyWeather/HourlyWeather";
import { FormEvent, useState, useEffect } from "react";
import weatherApi from "../services/api/weatherApi";
import { useParams } from "react-router";

function SearchPage() {
  const params = useParams<{ lat: string; long: string }>();

  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [dailyWeather, setDailyWeather] = useState([]);

  useEffect(() => {
    if (params.lat && params.long) {
      weatherApi(+params?.lat, +params?.long).then(([hourly, daily]) => {
        setHourlyWeather(hourly);
        setDailyWeather(daily);
      });
    }
  }, [params]);

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
}

export default SearchPage;
