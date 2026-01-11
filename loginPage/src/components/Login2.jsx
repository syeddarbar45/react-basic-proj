import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login2 = ({ switchToSignup }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userName: formData.username,
      password: formData.password,
    };
    try {
      const res = await fetch("http://localhost:8080/api/customers/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        localStorage.setItem("loggedIn", "true");
        navigate("/customers");
      } else {
        alert(await res.text());
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow-sm bg-light"
      >
        <h2 className="mb-4 text-center">Login</h2>

        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>

        <p className="text-center">
          Don’t have an account?{" "}
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login2;
