import DailyWeather from "../components/DailyWeather/DailyWeather";
import HourlyWeather from "../components/HourlyWeather/HourlyWeather";
import { FormEvent, useState, useEffect } from "react";
import weatherApi from "../services/api/weatherApi";

type Location = {
  latitude: FormDataEntryValue;
  longitude: FormDataEntryValue;
} | null;

function SearchPage() {
  const [location, setLocation] = useState<Location>(null);

  const [hourlyWeather, setHourlyWeather] = useState<[]>([]);
  const [dailyWeather, setDailyWeather] = useState<[]>([]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const lat = formData.get("lat");
    const long = formData.get("long");
    if (lat && long) {
      setLocation({ latitude: lat, longitude: long });
    }
  };

  useEffect(() => {
    if (location) {
      weatherApi(+location?.latitude, +location?.longitude).then(
        ([hourly, daily]) => {
          setHourlyWeather(hourly);
          setDailyWeather(daily);
        }
      );
    }
  }, [location]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Lat" className="border" name="lat" />
        <br />
        <input type="text" placeholder="Long" className="border" name="long" />
        <br />
        <button className="border" type="submit">
          Search
        </button>
      </form>
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
