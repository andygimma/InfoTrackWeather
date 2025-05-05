import { useWeather } from "../context/weatherContext";

const HomePage = () => {
  const { loading, address, error, hourlyWeather, dailyWeather } = useWeather();
  console.log({ dailyWeather, hourlyWeather });
  return (
    <div>
      <main>
        {loading && <p>Please allow location services</p>}
        <p>
          Location: {address?.city}, {address?.state}
        </p>
        {error && <p>Error: {error}</p>}

        <section className="flex">
          <section>
            {dailyWeather.length > 0 ? (
              dailyWeather.map(
                (elem: {
                  temperature: number;
                  endTime: React.ReactNode;
                  probabilityOfPrecipitation: { value: number };
                  number: number;
                  name: string;
                }) => {
                  return (
                    <section key={elem.number}>
                      <p>{elem.name}</p>
                      <p>{elem.temperature}</p>
                      <p>{elem.endTime}</p>
                      <p>{elem.probabilityOfPrecipitation.value}</p>
                    </section>
                  );
                }
              )
            ) : (
              <p>Loading daily weather...</p>
            )}
          </section>
          <section>
            {hourlyWeather.length > 0 ? (
              hourlyWeather.map(
                (elem: {
                  temperature: number;
                  endTime: React.ReactNode;
                  probabilityOfPrecipitation: { value: number };
                  number: number;
                }) => {
                  return (
                    <section key={elem.number}>
                      <p>{elem.temperature}</p>
                      <p>{elem.endTime}</p>
                      <p>{elem.probabilityOfPrecipitation.value}</p>
                    </section>
                  );
                }
              )
            ) : (
              <p>Loading hourly weather...</p>
            )}
          </section>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
