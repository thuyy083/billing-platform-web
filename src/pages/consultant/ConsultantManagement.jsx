import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./ConsultantManagement.module.scss";

import { fetchConsultants } from "../../redux/slices/consultantSlice";

import ConsultantTable from "./ConsultantTable";
import ConsultantModal from "./ConsultantModal";

const ConsultantManagement = () => {
  const dispatch = useDispatch();

  const consultants = useSelector(
    state => state.consultant.list
  );

  const loading = useSelector(
    state => state.consultant.loading
  );

  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    dispatch(
      fetchConsultants({
        page,
        size: 5,
        keyword,
        role
      })
    );
  }, [dispatch, page]);

  const handleSearch = () => {

    setPage(0);

    dispatch(
      fetchConsultants({
        page: 0,
        size: 5,
        keyword,
        role
      })
    );
  };

  const handleReset = () => {

    setKeyword("");
    setRole("");
    setPage(0);

    dispatch(
      fetchConsultants({
        page: 0,
        size: 5
      })
    );
  };

  const {
    totalPages
  } = useSelector(
    state => state.consultant
  );

  const handleCreate = () => {
    setSelectedRow(null);
    setOpenModal(true);
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Quản lý người dùng</h1>
          <p className={styles.quanly}>
            Quản lý danh sách tài khoản người dùng
          </p>
        </div>

        <button
          className={styles.addBtn}
          onClick={handleCreate}
        >
          + Thêm mới
        </button>
      </div>

      <div className={styles.searchSection}>

        <input
          type="text"
          placeholder="Tìm theo tên, username hoặc số điện thoại..."
          value={keyword}
          onChange={(e) =>
            setKeyword(e.target.value)
          }
        />

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        >
          <option value="">
            Tất cả vai trò
          </option>

          <option value="MANAGER">
            Người quản lý
          </option>

          <option value="CONSULTANT">
            Tư vấn viên
          </option>
        </select>

        <button
          className={styles.searchBtn}
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>

        <button
          className={styles.resetBtn}
          onClick={handleReset}
        >
          Làm mới
        </button>

      </div>

      <ConsultantTable
        data={consultants}
        loading={loading}
        onEdit={handleEdit}
        page={page}
        pageSize={5}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <ConsultantModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        consultant={selectedRow}
        onSuccess={() =>
          dispatch(
            fetchConsultants({
              page,
              size: 5,
              keyword,
              role
            })
          )
        }
      />
    </div>
  );
};

export default ConsultantManagement;