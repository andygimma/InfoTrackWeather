import DailyWeather from "../components/DailyWeather/DailyWeather";
import HourlyWeather from "../components/HourlyWeather/HourlyWeather";
import { useWeather } from "../context/weatherContext";

const HomePage = () => {
  const { loading, address, error, hourlyWeather, dailyWeather } = useWeather();
  return (
    <div>
      <main>
        {loading && <p>Please allow location services</p>}
        <p>
          Location: {address?.city}, {address?.state}
        </p>
        {error && <p>Error: {error}</p>}

        <section className="flex">
          {/* <DailyWeather dailyWeather={dailyWeather} /> */}
          <HourlyWeather
            hourlyWeather={hourlyWeather}
            label="Hourly Temperature"
          />
          <DailyWeather dailyWeather={dailyWeather} label="Daily Weather" />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
