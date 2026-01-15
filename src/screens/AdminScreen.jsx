import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../css/admin.css";

function AdminScreen() {
  const [activeTab, setActiveTab] = useState("salons");
  const [salons, setSalons] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editSalon, setEditSalon] = useState(null);
  const [newSalon, setNewSalon] = useState({
    name: "",
    email: "",
    password: "",
    gender: "man",
    city: "",
    image_url: "",
    phone: "",
    address: "",
    description: "",
  });

  const navigate = useNavigate();

  // Check if admin is logged in
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    const token = localStorage.getItem("adminToken");

    if (!admin || !token) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === "salons") {
      fetchSalons();
    } else {
      fetchReservations();
    }
  }, [activeTab]);

  const fetchSalons = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:5002/api/admin/salons", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setSalons(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:5002/api/admin/reservations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setReservations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSalon = async (id) => {
    if (!window.confirm("Are you sure you want to delete this salon?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`http://localhost:5002/api/admin/salons/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setSalons(salons.filter((salon) => salon.id !== id));
      alert("Salon deleted successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditSalon = (salon) => {
    setEditSalon(salon);
    setNewSalon(salon);
  };

  const handleSaveSalon = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const url = editSalon
        ? `http://localhost:5002/api/admin/salons/${editSalon.id}`
        : "http://localhost:5002/api/admin/salons";

      const method = editSalon ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSalon),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      if (editSalon) {
        setSalons(salons.map((s) => (s.id === editSalon.id ? data.salon : s)));
        alert("Salon updated successfully");
      } else {
        setSalons([...salons, data.salon]);
        alert("Salon added successfully");
      }

      setEditSalon(null);
      setNewSalon({
        name: "",
        email: "",
        password: "",
        gender: "man",
        city: "",
        image_url: "",
        phone: "",
        address: "",
        description: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateReservationStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(
        `http://localhost:5002/api/admin/reservations/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setReservations(
        reservations.map((r) => (r.id === id ? { ...r, status } : r))
      );

      alert("Reservation status updated");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="admin-container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

        {error && <div className="admin-error">{error}</div>}

        <div className="admin-tabs">
          <button
            className={activeTab === "salons" ? "active" : ""}
            onClick={() => setActiveTab("salons")}
          >
            Salons ({salons.length})
          </button>
          <button
            className={activeTab === "reservations" ? "active" : ""}
            onClick={() => setActiveTab("reservations")}
          >
            Reservations ({reservations.length})
          </button>
        </div>

        {/* Salons Tab */}
        {activeTab === "salons" && (
          <div className="admin-content">
            <div className="add-salon-form">
              <h3>{editSalon ? "Edit Salon" : "Add New Salon"}</h3>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Salon Name"
                  value={newSalon.name}
                  onChange={(e) =>
                    setNewSalon({ ...newSalon, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newSalon.email}
                  onChange={(e) =>
                    setNewSalon({ ...newSalon, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newSalon.password}
                  onChange={(e) =>
                    setNewSalon({ ...newSalon, password: e.target.value })
                  }
                />
                <select
                  value={newSalon.gender}
                  onChange={(e) =>
                    setNewSalon({ ...newSalon, gender: e.target.value })
                  }
                >
                  <option value="man">Men</option>
                  <option value="women">Women</option>
                </select>
                <input
                  type="text"
                  placeholder="City"
                  value={newSalon.city}
                  onChange={(e) =>
                    setNewSalon({ ...newSalon, city: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={newSalon.phone}
                  onChange={(e) =>
                    setNewSalon({ ...newSalon, phone: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newSalon.image_url}
                  onChange={(e) =>
                    setNewSalon({ ...newSalon, image_url: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={newSalon.address}
                  onChange={(e) =>
                    setNewSalon({ ...newSalon, address: e.target.value })
                  }
                />
              </div>
              <textarea
                placeholder="Description"
                value={newSalon.description}
                onChange={(e) =>
                  setNewSalon({ ...newSalon, description: e.target.value })
                }
                rows="3"
              />
              <div className="form-actions">
                <button onClick={handleSaveSalon} className="save-btn">
                  {editSalon ? "Update Salon" : "Add Salon"}
                </button>
                {editSalon && (
                  <button
                    onClick={() => {
                      setEditSalon(null);
                      setNewSalon({
                        name: "",
                        email: "",
                        password: "",
                        gender: "man",
                        city: "",
                        image_url: "",
                        phone: "",
                        address: "",
                        description: "",
                      });
                    }}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="salons-list">
              <h3>All Salons</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>City</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salons.map((salon) => (
                      <tr key={salon.id}>
                        <td>{salon.id}</td>
                        <td>{salon.name}</td>
                        <td>{salon.email}</td>
                        <td>{salon.gender}</td>
                        <td>{salon.city}</td>
                        <td>{salon.rating || "N/A"}</td>
                        <td>
                          <button
                            onClick={() => handleEditSalon(salon)}
                            className="edit-btn"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteSalon(salon.id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reservations Tab */}
        {activeTab === "reservations" && (
          <div className="admin-content">
            <div className="reservations-list">
              <h3>All Reservations</h3>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>User</th>
                      <th>Salon</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((res) => (
                      <tr key={res.id}>
                        <td>{res.id}</td>
                        <td>
                          {res.user_name} ({res.user_email})
                        </td>
                        <td>{res.salon_name}</td>
                        <td>{res.category}</td>
                        <td>{res.reservation_date}</td>
                        <td>
                          {res.reservation_time?.split("T")[1]?.slice(0, 5)}
                        </td>
                        <td>
                          <select
                            value={res.status || "pending"}
                            onChange={(e) =>
                              handleUpdateReservationStatus(
                                res.id,
                                e.target.value
                              )
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              if (window.confirm("Delete this reservation?")) {
                                // Implement delete reservation
                              }
                            }}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminScreen;
