type Weather = {
  temperature: number;
  startTime: Date;
  probabilityOfPrecipitation: { value: number };
  number: number;
  name: string;
};

interface IDailyWeather {
  dailyWeather: Weather[];
}

function DailyWeather(props: IDailyWeather) {
  return (
    <section>
      {props.dailyWeather.length > 0 ? (
        props.dailyWeather.map(
          (elem: {
            temperature: number;
            startTime: Date;
            probabilityOfPrecipitation: { value: number };
            number: number;
            name: string;
          }) => {
            return (
              <section key={elem.number}>
                <p>{elem.name}</p>
                <p>{elem.temperature}</p>
                <p>{formatDate(elem.startTime)}</p>
                <p>{elem.probabilityOfPrecipitation.value}</p>
              </section>
            );
          }
        )
      ) : (
        <p>Loading daily weather...</p>
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

export default DailyWeather;
