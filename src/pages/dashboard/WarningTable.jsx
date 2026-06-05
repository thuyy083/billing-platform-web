import styles from "./WarningTable.module.scss";

const WarningTable = ({ warnings }) => {
  return (
    <div className={styles.wrapper}>
      <h3>Cảnh báo cần xử lý</h3>

      {warnings.content.length === 0 ? (
        <div className={styles.empty}>
          Không có cảnh báo
        </div>
      ) : (
        <table>
          <tbody>
            {warnings.content.map((item) => (
              <tr key={item.id}>
                <td>{item.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WarningTable;