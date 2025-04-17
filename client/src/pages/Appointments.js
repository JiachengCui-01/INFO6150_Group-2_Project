import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    time: "",
    reason: "",
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  const userRole = localStorage.getItem("userRole");

  const handleGoBack = () => {
    navigate("/home");
  };

  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 16; hour++) {
      for (let minute of [0, 30]) {
        const hourStr = String(hour).padStart(2, "0");
        const minStr = String(minute).padStart(2, "0");
        options.push(`${hourStr}:${minStr}`);
      }
    }
    return options;
  };

  useEffect(() => {
    if (!userEmail || userRole !== "client") {
      navigate("/login");
      return;
    }
    fetchAppointments();
  }, [userEmail, userRole, navigate]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/appointments/patient?email=${userEmail}`
      );
      setAppointments(response.data);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({
      ...newAppointment,
      [name]: value,
    });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/appointments", {
        email: userEmail,
        date: newAppointment.date,
        time: newAppointment.time,
        reason: newAppointment.reason,
      });

      alert("Appointment booked successfully!");
      setNewAppointment({
        date: "",
        time: "",
        reason: "",
      });
      fetchAppointments();
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message ||
          "Failed to book appointment. Please try again."
      );
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/appointments/cancel/${id}`, {
        email: userEmail,
      });

      alert("Appointment cancelled successfully!");
      fetchAppointments();
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message ||
          "Failed to cancel appointment. Please try again."
      );
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <>
      <div className="login-background"></div>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="text-white">Appointment Management</h2>
          <button className="btn btn-outline-light" onClick={handleGoBack}>
            Back to Home
          </button>
        </div>

        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h4>Schedule New Appointment</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={newAppointment.date}
                    onChange={handleInputChange}
                    min={getTodayString()}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Time</label>
                  <select
                    className="form-select"
                    name="time"
                    value={newAppointment.time}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Select Time --</option>
                    {generateTimeOptions().map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Reason for Visit</label>
                <textarea
                  className="form-control"
                  name="reason"
                  rows="3"
                  value={newAppointment.reason}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Book Appointment
              </button>
            </form>
          </div>
        </div>

        <div className="card">
          <div className="card-header bg-primary text-white">
            <h4>My Appointments</h4>
          </div>
          <div className="card-body">
            {appointments.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment._id}>
                        <td>
                          {new Date(appointment.date).toLocaleDateString()}
                        </td>
                        <td>{appointment.time}</td>
                        <td>{appointment.reason}</td>
                        <td>
                          <span
                            className={`badge ${
                              appointment.status === "pending"
                                ? "bg-warning"
                                : appointment.status === "confirmed"
                                ? "bg-success"
                                : appointment.status === "cancelled"
                                ? "bg-danger"
                                : "bg-secondary"
                            }`}
                          >
                            {appointment.status}
                          </span>
                        </td>
                        <td>
                          {appointment.status === "pending" && (
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleCancel(appointment._id)}
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center">
                No appointment records. Book your first appointment now!
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointments;
