import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, getMe, logout } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import "./Login.scss";

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim()) {
      toast.warning("Vui lòng nhập username");
      return;
    }

    if (!form.password.trim()) {
      toast.warning("Vui lòng nhập mật khẩu");
      return;
    }

    try {

      // Bước 1: Login trước
      await dispatch(login(form)).unwrap();

      // Bước 2: Lấy thông tin user
await dispatch(login(form)).unwrap();

const user =
  await dispatch(getMe()).unwrap();

const role = (
  user?.role ||
  user?.roleName ||
  user?.roles?.[0]?.name ||
  ""
).toUpperCase();

// CONSULTANT
if (role === "CONSULTANT") {

  dispatch(logout());

  localStorage.removeItem("user");

  toast.warning(
    "Tài khoản CONSULTANT chỉ được phép đăng nhập trên ứng dụng Mobile."
  );

  return;
}

// Không phải MANAGER
if (role !== "MANAGER") {

  dispatch(logout());

  localStorage.removeItem("user");

  toast.error(
    "Bạn không có quyền truy cập hệ thống web."
  );

  return;
}

toast.success("Đăng nhập thành công");

setTimeout(() => {
  navigate("/");
}, 1000);
      // Chỉ cho MANAGER
      if (role?.toUpperCase() !== "MANAGER") {

        dispatch(logout());

        localStorage.removeItem("user");

        toast.error(
          "Tài khoản này chỉ được sử dụng trên Mobile App"
        );

        return;
      }

      toast.success("Đăng nhập thành công");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {

      const message =
        err?.message ||
        err?.error ||
        "Username hoặc mật khẩu không chính xác";

      toast.error(message);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          <img src={logo} alt="logo" />
        </div>

        <h2>HỆ THỐNG QUẢN LÝ <br /> THU CƯỚC</h2>
        <p className="login-subtitle">Đăng nhập để tiếp tục</p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="login-btn">
            Đăng nhập
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;