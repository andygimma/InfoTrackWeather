type Weather = {
  temperature: number;
  startTime: Date;
  probabilityOfPrecipitation: { value: number };
  number: number;
  name: string;
};

interface IHourlyWeather {
  hourlyWeather: Weather[];
}

function HourlyWeather(props: IHourlyWeather) {
  return (
    <section>
      {props.hourlyWeather.length > 0 ? (
        props.hourlyWeather.map(
          (elem: {
            temperature: number;
            startTime: Date;
            probabilityOfPrecipitation: { value: number };
            number: number;
          }) => {
            return (
              <section key={elem.number}>
                <p>{formatDate(elem.startTime)}</p>
                <p>temp: {elem.temperature}</p>
                <p>precipitation: {elem.probabilityOfPrecipitation.value}</p>
              </section>
            );
          }
        )
      ) : (
        <p>Loading hourly weather...</p>
      )}
    </section>
  );
}

function formatDate(dateString: Date) {
  const date = new Date(dateString);

  const day: string = date.getDate().toString().padStart(2, "0");
  const month: string = (date.getMonth() + 1).toString().padStart(2, "0");

  let hours: number = date.getHours();
  const minutes: string = date.getMinutes().toString().padStart(2, "0");
  const ampm: string = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours ? hours : 12;
  const hourString: string = hours.toString().padStart(2, "0");

  return `${day}/${month} ${hourString}:${minutes}${ampm}`;
}

export default HourlyWeather;
