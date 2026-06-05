import {
  useState
} from "react";

import styles
from "./UploadBox.module.scss";

import {
  useSelector
} from "react-redux";

import {
  toast
} from "react-toastify";
import paidCustomerImportService from "../../services/paidCustomerImportService";


const UploadBox = () => {

  const [selectedFile,
    setSelectedFile] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  const {
    selectedPeriodId
  } =
  useSelector(
    state =>
      state.paidCustomerImport
  );

  const handleFile =
    file => {

      if (!file) return;

      const extension =
        file.name
          .split(".")
          .pop()
          .toLowerCase();

      if (
        !["xlsx","xls"]
          .includes(extension)
      ) {

        toast.error(
          "Chỉ hỗ trợ file Excel"
        );

        return;
      }

      setSelectedFile(file);

    };

  const handleImport =
  async () => {

    if (!selectedPeriodId) {

      toast.warning(
        "Vui lòng chọn kỳ cước"
      );

      return;
    }

    if (!selectedFile) {

      toast.warning(
        "Vui lòng chọn file"
      );

      return;
    }

    try {

      setLoading(true);

      await paidCustomerImportService
        .importReconciliation(
          selectedPeriodId,
          selectedFile
        );

      toast.success(
        "Import thành công"
      );

      setSelectedFile(null);

    } catch (error) {

      toast.error(
        error?.response?.data?.message ||
        "Import thất bại"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleDownload =
  async () => {

    try {

      const response =
        await paidCustomerImportService
          .downloadTemplate();

      const url =
        window.URL.createObjectURL(
          new Blob([
            response.data
          ])
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        "mau_import.xlsx";

      link.click();

    } catch {

      toast.error(
        "Không tải được file mẫu"
      );

    }

  };

  return (

    <div className={styles.card}>

      <div
        className={styles.download}
      >

        <button
          onClick={
            handleDownload
          }
        >
          Download File Mẫu
        </button>

      </div>

      <div
        className={
          styles.uploadBox
        }
      >

        <div>
          📁
        </div>

        <h2>
          Kéo thả file Excel
          vào đây
        </h2>

        <p>
          Chỉ hỗ trợ
          .xlsx, .xls
        </p>

        <label
          className={
            styles.chooseBtn
          }
        >

          Chọn File

          <input
            hidden
            type="file"
            accept=".xlsx,.xls"
            onChange={e =>
              handleFile(
                e.target.files[0]
              )
            }
          />

        </label>

        {
          selectedFile && (

            <div
              className={
                styles.fileInfo
              }
            >

              {selectedFile.name}

            </div>

          )
        }

      </div>

      <div
        className={
          styles.footer
        }
      >

        <button

          disabled={loading}

          onClick={
            handleImport
          }

          className={
            styles.importBtn
          }

        >

          {
            loading
              ? "Đang import..."
              : "Import dữ liệu"
          }

        </button>

      </div>

    </div>

  );

};

export default UploadBox;