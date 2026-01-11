import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      custName: form.name,
      custAddress: form.address,
      custPhoneNumber: form.phone,
      userName: form.username,
      password: form.password,
    };

    try {
      const signUpRes = await fetch("http://localhost:8080/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (signUpRes.ok) {
        alert("registered sucessfully");
        navigate("/");
      }
    } catch (err) {
      alert(`Error message:${err.message}`);
    }
  };
  return (
    <div>
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>PhoneNumber:</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">signup</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
