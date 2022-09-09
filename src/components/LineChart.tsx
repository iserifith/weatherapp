import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  Title,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { DayWeatherDataType } from "../utils/helpers";

ChartJS.register(
  LineElement,
  Title,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Weather Timeline",
    },
  },
};

type Props = {
  days: DayWeatherDataType[];
};

type YAccessorType = "tempmax" | "tempmin" | "humidity";

const LineChart = (props: Props) => {
  const { days } = props;

  const createDatasets = (
    y: YAccessorType,
    backgroundColor: string,
    borderColor: string,
    label: string
  ) => ({
    backgroundColor,
    borderColor,
    label,
    data: days.map((d) => d[y]),
  });

  const getDataSets = () => {
    const labels = days.map((d) => d.datetime);

    return {
      labels,
      datasets: [
        createDatasets("tempmax", "#ef1031", "#ba0c26", "Max Temperature"),
        createDatasets("tempmin", "#45d6f3", "#0c9dba", "Min Temperature"),
        createDatasets("humidity", "#f3ed45", "#efe810", "Humidity"),
      ],
    };
  };

  return <Line options={options} data={getDataSets()} />;
};

export default LineChart;
