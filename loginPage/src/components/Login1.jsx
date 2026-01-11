import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      userName: formData.username,
      password: formData.password,
    };
    try {
      const loginRef = await fetch(
        "http://localhost:8080/api/customers/login",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (loginRef.ok) {
        localStorage.setItem("loggedIn", "true");
        navigate("/customers");
      } else {
        alert(await loginRef.text());
      }
    } catch (err) {
      alert(`Error:${err.message}`);
    }
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div>
          <label>username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">sign in</button>
        <p>
          Do not have account?{""}
          <button onClick={() => navigate("/signup")} type="button">
            Signup
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login1;
