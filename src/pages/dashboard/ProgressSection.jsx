import ProgressChart from "./ProgressChart";

import styles from "./ProgressSection.module.scss";

const ProgressSection = ({ overview }) => {
  return (
    <div className={styles.container}>

      <ProgressChart
        title="Tỷ lệ thu hồ sơ"
        percent={
          overview.recordsProgressPercentage || 0
        }
      />

      <ProgressChart
        title="Tỷ lệ thu tiền"
        percent={
          overview.amountProgressPercentage || 0
        }
      />

    </div>
  );
};

export default ProgressSection;