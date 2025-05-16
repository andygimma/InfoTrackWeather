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

interface IDailyWeather {
  dailyWeather: Weather[];
  label: string;
  full?: boolean;
}

function DailyWeather(props: IDailyWeather) {
  const className = `${props.full ? "" : "md:w-1/2"}`;
  const labels = props.dailyWeather.map((elem) => {
    return elem.name;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: props.label,
        data: props.dailyWeather.map((elem) => {
          return elem.temperature;
        }),
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className={className}>
      {props.dailyWeather.length > 0 ? (
        <section data-testid="daily-weather-section">
          <Bar data={data} plugins={[barValuePlugin]} className="w-full" />
        </section>
      ) : (
        <section
          data-testid="daily-weather-loading-section"
          className="md:hidden"
        >
          <p>Loading daily weather...</p>
        </section>
      )}
    </section>
  );
}

export default DailyWeather;
