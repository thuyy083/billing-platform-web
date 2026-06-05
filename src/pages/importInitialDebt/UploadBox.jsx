import styles from "./UploadBox.module.scss";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setPreviewData,
  setLoading
} from "../../redux/slices/importInitialDebtSlice";

import importInitialDebtService from "../../services/importInitialDebtService";

import { toast } from "react-toastify";

const UploadBox = () => {

  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();

  const { loading } = useSelector(
    state => state.importInitialDebt
  );

  const handleChangeFile = (file) => {

    if (!file) return;

    const extension = file.name
      .split(".")
      .pop()
      .toLowerCase();

    if (!["xlsx", "xls"].includes(extension)) {

      toast.error(
        "Chỉ cho phép upload file Excel (.xlsx, .xls)"
      );

      return;
    }

    setSelectedFile(file);
  };

  const handleInputChange = (e) => {
    handleChangeFile(e.target.files[0]);
  };

  const handleDrop = (e) => {

    e.preventDefault();

    const file = e.dataTransfer.files[0];

    handleChangeFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleImport = async () => {

    if (!selectedFile) {

      toast.warning("Vui lòng chọn file");

      return;
    }

    try {

      dispatch(setLoading(true));

      const result =
        await importInitialDebtService.importInitialDebt(
          selectedFile
        );

      toast.success(
        "Import dữ liệu đầu kỳ thành công"
      );

      console.log(result);

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Import thất bại"
      );

    } finally {

      dispatch(setLoading(false));

    }
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.uploadBox}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className={styles.icon}>
          📁
        </div>

        <h2>
          Kéo thả file Excel vào đây
        </h2>

        <p>
          Chỉ hỗ trợ .xlsx, .xls
        </p>

        {!selectedFile && (
          <label className={styles.uploadBtn}>
            Chọn File

            <input
              type="file"
              hidden
              accept=".xlsx,.xls"
              onChange={handleInputChange}
            />
          </label>
        )}

        {selectedFile && (
          <div className={styles.fileInfo}>
            <span>
              {selectedFile.name}
            </span>

            <span>
              {(selectedFile.size / 1024).toFixed(2)}
              {" "}KB
            </span>
          </div>
        )}
      </div>

      {selectedFile && (
        <div className={styles.footer}>
          <div className={styles.actions}>
            <button
              disabled={loading}
              className={styles.importBtn}
              onClick={handleImport}
            >
              {loading
                ? "Đang import..."
                : "Import Dữ Liệu"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadBox;