import styles from "./ConsultantTable.module.scss";

const ConsultantTable = ({
  data,
  onEdit,

  page,
  pageSize,
  totalPages,
  onPageChange
}) => {

  return (
    <div className={styles.tableWrapper}>
      <table>

        <thead>
          <tr>
            <th>STT</th>
            <th>Tài khoản</th>
            <th>Họ tên</th>
            <th>Số điện thoại</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>

          {data.map((item, index) => (
            <tr key={item.id}>
              <td>
                {page * pageSize + index + 1}
              </td>

              <td>{item.username}</td>

              <td>{item.fullName}</td>

              <td>{item.phone}</td>

              <td>{item.role}</td>

              <td>
                <span
                  className={
                    item.status === "ACTIVE"
                      ? styles.active
                      : styles.inactive
                  }
                >
                  {item.status}
                </span>
              </td>

              <td>
                <button
                  className={styles.editBtn}
                  onClick={() => onEdit(item)}
                >
                  Sửa
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>
      <div className={styles.pagination}>

        <button
          disabled={page === 0}
          onClick={() => onPageChange(0)}
        >
          ⏮
        </button>

        <button
          disabled={page === 0}
          onClick={() => onPageChange(page - 1)}
        >
          ◀
        </button>

        <span>
          Trang {page + 1}/{totalPages}
        </span>

        <button
          disabled={page === totalPages - 1}
          onClick={() => onPageChange(page + 1)}
        >
          ▶
        </button>

        <button
          disabled={page === totalPages - 1}
          onClick={() => onPageChange(totalPages - 1)}
        >
          ⏭
        </button>

      </div>
    </div>
  );
};

export default ConsultantTable;