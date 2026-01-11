import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

const ResponseV2 = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedIn");

  const tableHeaders = {
    id: "CUSTOMER ID",
    name: "NAME",
    address: "ADDRESS",
    phone: "PHONE NUMBER",
    actions: "ACTIONS",
    userName: "USERNAME",
  };
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await fetch("http://localhost:8080/api/customers");
    const data = await res.json();
    setCustomers(data);
  };

  const handleEditClick = (customer) => {
    setEditingCustomer({ ...customer });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCustomer((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = async () => {
    try {
      const saveRes = await fetch(
        `http://localhost:8080/api/customers/${editingCustomer.custId}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(editingCustomer),
        }
      );
      if (saveRes.ok) {
        setEditingCustomer(null);
        setShowModal(false);
        await fetchCustomers();
      } else {
        alert("failed to update customer");
      }
    } catch (err) {
      alert(`An error occured:${err.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/"); // Redirect to login
  };

  return isLoggedIn === "true" ? (
    <div style={{ textAlign: "center", paddingTop: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          marginBottom: "20px",
        }}
      >
        <h1>Customers</h1>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>{tableHeaders.id}</th>
              <th>{tableHeaders.name}</th>
              <th>{tableHeaders.address}</th>
              <th>{tableHeaders.phone}</th>
              <th>{tableHeaders.userName}</th>
              <th>{tableHeaders.actions}</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cus, ind) => {
              const {
                custId,
                custName,
                custAddress,
                custPhoneNumber,
                userName,
              } = cus;

              return (
                <tr key={ind}>
                  <td>{custId}</td>
                  <td>{custName}</td>
                  {/* {custAddress.map((addr, ind) => {
                  <td>{addr}</td>
                  })}; */}
                  <td>custAddress</td>
                  <td>{custPhoneNumber}</td>
                  <td>{userName}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => {
                        handleEditClick(cus);
                      }}
                    >
                      EDIT
                    </button>
                    <button
                      className="btn btn-danger btn-sm "
                      onClick={async () => {
                        const confirmDelete = window.confirm(
                          `Are you sure you want to delete customer ${cus.custName}`
                        );

                        if (!confirmDelete) return;
                        try {
                          const delRes = await fetch(
                            `http://localhost:8080/api/customers/${cus.custId}`,
                            { method: "DELETE" }
                          );
                          if (delRes.ok) {
                            await fetchCustomers();
                          } else {
                            alert("failed to delete customer");
                          }
                        } catch (err) {
                          `error:${err.message}`;
                        }
                      }}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* {showmodal} */}
      {showModal && editingCustomer && (
        <div
          className="modal"
          style={{
            display: "block",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            padding: "20px",
            border: "1px solid #ccc",
            zIndex: 1000,
            width: "400px",
            borderRadius: "8px",
          }}
        >
          <h3>Edit Customer</h3>
          <div className="form-group">
            <label>Name:</label>
            <input
              name="custName"
              className="form-control"
              value={editingCustomer.custName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              name="custAddress"
              className="form-control"
              value={editingCustomer.custAddress}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              name="custPhoneNumber"
              className="form-control"
              value={editingCustomer.custPhoneNumber}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ marginTop: "15px" }}>
            <button className="btn btn-success me-2" onClick={handleSave}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setShowModal(false);
                setEditingCustomer(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default ResponseV2;
