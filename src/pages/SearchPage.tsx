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
    console.log({ lat, long });
  };

  console.log({ searchDailyWeather, searchHourlyWeather });
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
    </div>
  );
}

export default SearchPage;
