import { useEffect, useState } from "react";

import styles from "./ConsultantModal.module.scss";
import consultantService from "../../services/consultantService";
import { toast } from "react-toastify";

const ConsultantModal = ({
  open,
  onClose,
  consultant,
  onSuccess
}) => {

  const initialForm = {
    username: "",
    fullName: "",
    phone: "",
    password: "",
    role: "CONSULTANT"
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {

    if (!open) return;

    if (consultant) {

      setForm({
        username: consultant.username || "",
        fullName: consultant.fullName || "",
        phone: consultant.phone || "",
        password: "",
        role: consultant.role || "CONSULTANT"
      });

    } else {

      setForm(initialForm);

    }

  }, [consultant, open]);

  if (!open) return null;

  const handleSubmit = async () => {
    try {

      if (consultant) {

        await consultantService.update(
          consultant.id,
          {
            fullName: form.fullName,
            phone: form.phone,
            role: form.role
          }
        );

        toast.success("Cập nhật người dùng thành công");

      } else {

        await consultantService.create({
          username: form.username,
          fullName: form.fullName,
          phone: form.phone,
          password: form.password,
          role: form.role
        });

        toast.success("Thêm người dùng thành công");
      }

      // refresh danh sách
      await onSuccess?.();

      setForm(initialForm);

      // đóng modal
      onClose();

    } catch (error) {

      const messages =
        error?.response?.data?.message;

      if (
        Array.isArray(messages) &&
        messages.length > 0
      ) {

        messages.forEach(item => {
          toast.error(item.message);
        });

      } else {

        toast.error(
          error?.response?.data?.message ||
          "Có lỗi xảy ra"
        );

      }

    }
  };

  return (
    <div className={styles.overlay}>

      <div className={styles.modal}>

        <h2>
          {consultant
            ? "Cập nhật thông tin người dùng"
            : "Thêm người dùng"}
        </h2>

        {!consultant && (
          <>
            <input
              placeholder="Tên đăng nhập"
              value={form.username}
              onChange={(e) =>
                setForm({
                  ...form,
                  username: e.target.value
                })
              }
            />

            <input
              type="password"
              placeholder="Mật khẩu"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value
                })
              }
            />
          </>
        )}

        <input
          placeholder="Họ tên"
          value={form.fullName}
          onChange={(e) =>
            setForm({
              ...form,
              fullName: e.target.value
            })
          }
        />

        <input
          placeholder="Số điện thoại"
          value={form.phone}
          onChange={(e) =>
            setForm({
              ...form,
              phone: e.target.value
            })
          }
        />

        <div className={styles.formGroup}>
          <label>Vai trò</label>

          <select
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value
              })
            }
          >
            <option value="CONSULTANT">
              Tư vấn viên
            </option>

            <option value="MANAGER">
              Người quản lý
            </option>
          </select>
        </div>

        <div className={styles.actions}>
          <button
            onClick={() => {
              setForm(initialForm);
              onClose();
            }}
          >
            Hủy
          </button>

          <button
            className={styles.saveBtn}
            onClick={handleSubmit}
          >
            Lưu
          </button>
        </div>

      </div>

    </div>
  );
};

export default ConsultantModal;