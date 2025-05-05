import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

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
        // const y = bar.y + (bar.base - bar.y) / 2;
        const y = bar.y + 25;

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
  number: number;
  name: string;
};

interface IHourlyWeather {
  hourlyWeather: Weather[];
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
        label: "Hourly Temperature",
        data: weatherArray.map((elem) => {
          return elem.temperature;
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section>
      {props.hourlyWeather.length > 0 ? (
        <Bar data={data} plugins={[barValuePlugin]} />
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

  return `${hourString}:${minutes}${ampm}`;
}

export default HourlyWeather;
