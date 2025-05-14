import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const barValuePlugin = {
  id: "barValuePlugin",
  afterDatasetsDraw(chart: ChartJS<"bar">) {
    const { ctx } = chart;

    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);

      meta.data.forEach((bar, index) => {
        const value = dataset.data[index];

        ctx.save();
        ctx.fillStyle = "black";
        ctx.font = "bold 12px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const x = bar.x;
        const y = bar.y + 10;

        ctx.fillText(value?.toString() || "", x, y);
        ctx.restore();
      });
    });
  },
};

type Weather = {
  temperature: number;
  startTime: Date;
  probabilityOfPrecipitation: { value: number };
  relativeHumidity: { value: number };
  number: number;
  name: string;
};

interface IHourlyWeather {
  hourlyWeather: Weather[];
  label: string;
}

function HourlyWeather(props: IHourlyWeather) {
  const weatherArray = props.hourlyWeather.slice(0, 8);
  const labels = weatherArray.map((elem) => {
    return formatDate(elem.startTime);
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: props.label,
        data: weatherArray.map((elem) => {
          return elem.temperature;
        }),
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgb(255, 99, 132)"],
        borderWidth: 1,
      },
    ],
  };

  const rainData = {
    labels: labels,
    datasets: [
      {
        label: "Hourly Precipitation %",
        data: weatherArray.map((elem) => {
          return elem.probabilityOfPrecipitation.value;
        }),
        backgroundColor: ["rgba(54, 162, 0, 0.2)"],
        borderColor: ["rgb(54, 162, 235)"],
        borderWidth: 1,
      },
    ],
  };

  const humidityData = {
    labels: labels,
    datasets: [
      {
        label: "Hourly Humidity %",
        data: weatherArray.map((elem) => {
          return elem.relativeHumidity.value;
        }),
        backgroundColor: ["rgba(54, 111, 235, 0.2)"],
        borderColor: ["rgb(54, 162, 235)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section>
      {props.hourlyWeather.length > 0 ? (
        <>
          <Bar data={data} plugins={[barValuePlugin]} />
          <Bar data={rainData} plugins={[barValuePlugin]} />
          <Bar data={humidityData} plugins={[barValuePlugin]} />
        </>
      ) : (
        <section
          data-testid="hourly-weather-loading-section"
          className="mr-10 md:hidden"
        >
          <p>Loading hourly weather...</p>
        </section>
      )}
    </section>
  );
}

function formatDate(dateString: Date) {
  return moment(dateString).format("hh:mma");
}

export default HourlyWeather;
