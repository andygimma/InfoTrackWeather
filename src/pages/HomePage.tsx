import { useWeather } from "../context/weatherContext";

const HomePage = () => {
  const { loading, address, error } = useWeather();
  return (
    <div>
      <main>
        {loading && <p>Please allow location services</p>}
        <p>
          Location: {address?.city}, {address?.state}
        </p>
        {error && <p>Error: {error}</p>}
      </main>
    </div>
  );
};

export default HomePage;
