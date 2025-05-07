import DailyWeather from "../components/DailyWeather/DailyWeather";
import HourlyWeather from "../components/HourlyWeather/HourlyWeather";
import { useWeather } from "../context/weatherContext";
import { FormEvent } from "react";

function SearchPage() {
  const { searchDailyWeather, searchHourlyWeather, searchWeather } =
    useWeather();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const lat = formData.get("lat");
    const long = formData.get("long");
    if (lat && long) {
      searchWeather(+lat, +long);
    }
  };

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
          hourlyWeather={searchHourlyWeather}
          label="Hourly Temperature"
        />
        <DailyWeather
          dailyWeather={searchDailyWeather}
          label="Daily Temperature"
        />
      </section>
    </div>
  );
}

export default SearchPage;
