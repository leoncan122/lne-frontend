import React, { useRef } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  BarController,
  LineController,
  LineElement,
  Legend,
  Tooltip,
  Title,
} from "chart.js";
import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarController,
  LineController,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title
);

const ChartGraphic = ({ chartData }) => {
  const week1 = chartData?.group1;
  const week2 = week1 + chartData?.group2;
  const week3 = week2 + chartData?.group3;
  const week4 = week3 + chartData?.group4;

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "December 2022 - Number of new clients this month",
        position: "top",
      },
      datalabels: {
        display: true,
        color: "#000",
        formatter: function (value, context) {
          return value > 0 ? value : "";
        },
        font: {
          weight: "bold",
        },
        anchor: "end",
        offset: -20,
        align: "start",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of new clients",
        },
        ticks: {
          precision: 0,
        },
        min: 0,
        max: 10,
      },
    },
  };

  const labels = ["Week 1", "Week 2", "Week 3", "Week 4+"];

  const data = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "number of new clients",
        backgroundColor: "#2B80F5",
        data: [week1, week2, week3, week4],
        borderColor: "white",
        borderWidth: 2,
      },
      {
        type: "line",
        label: "required n of clients",
        borderColor: "#6ddfb7",
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        data: [5, 5, 5, 5],
        datalabels: {
          display: false,
        },
      },
    ],
  };
  const printDatasetAtEvent = (dataset) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;

    console.log(data.datasets[datasetIndex].label);
  };

  const printElementAtEvent = (element) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];

    console.log(data.labels[index], data.datasets[datasetIndex].data[index]);
  };

  const printElementsAtEvent = (elements) => {
    if (!elements.length) return;

    console.log(elements.length);
  };

  const chartRef = useRef();

  const onClick = (event) => {
    const { current } = chartRef;

    if (!current) {
      return;
    }

    printDatasetAtEvent(getDatasetAtEvent(current, event));
    printElementAtEvent(getElementAtEvent(current, event));
    printElementsAtEvent(getElementsAtEvent(current, event));
  };

  return (
    <Chart
      type="bar"
      ref={chartRef}
      data={data}
      options={options}
      onClick={onClick}
    />
  );
};

export default ChartGraphic;
