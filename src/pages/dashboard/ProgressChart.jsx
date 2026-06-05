import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import styles from "./ProgressChart.module.scss";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const ProgressChart = ({ percent = 0 }) => {
  const data = {
    datasets: [
      {
        data: [percent, 100 - percent],

        backgroundColor: [
          "#D70018",
          "#EAEAEA",
        ],

        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "75%",

    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className={styles.card}>
      <h3>Tỷ lệ hoàn thành</h3>

      <div className={styles.chartWrapper}>
        <Doughnut
          data={data}
          options={options}
        />

        <div className={styles.center}>
          {percent}%
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;