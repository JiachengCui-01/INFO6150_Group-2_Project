// import React, { useState, useEffect } from 'react';
// import { Container, Card, Table, Spinner } from 'react-bootstrap';

// const DoctorAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const doctorEmail = localStorage.getItem('userEmail');

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const res = await fetch(`/api/appointments/doctor`);
//         const data = await res.json();
//         if (res.ok) {
//           setAppointments(data);
//         } else {
//           console.error('Failed to fetch appointments:', data.message);
//         }
//       } catch (err) {
//         console.error('Error fetching appointments:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [doctorEmail]);

//   return (
//     <Container className="mt-5">
//       <Card className="shadow-sm border-0 p-4">
//         <h3 className="mb-4">📅 My Appointments</h3>
//         {loading ? (
//           <div className="text-center">
//             <Spinner animation="border" />
//             <p>Loading appointments...</p >
//           </div>
//         ) : appointments.length === 0 ? (
//           <p>No appointments found.</p >
//         ) : (
//           <Table striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Client</th> {/* ✅ Changed from 'Patient' to 'Client' */}
//                 <th>Reason</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {appointments.map((appt) => (
//                 <tr key={appt._id}>
//                   <td>{new Date(appt.date).toLocaleString()}</td>
//                   <td>{appt.patientName || 'N/A'}</td> {/* name key can stay as patientName */}
//                   <td>{appt.reason}</td>
//                   <td>{appt.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         )}
//       </Card>
//     </Container>
//   );
// };

// export default DoctorAppointments;


import React, { useState, useEffect } from "react";
import { Container, Card, Table, Spinner, Badge, Button } from "react-bootstrap";
import axios from "axios";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const doctorEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // Add logging to see what's happening
      console.log("Fetching appointments with doctor email:", doctorEmail);
      
      const response = await axios.get(
        `http://localhost:5000/api/appointments/doctor?email=${doctorEmail}`
      );
      
      console.log("Appointments data received:", response.data);
      setAppointments(response.data);
      setErrorMessage("");
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setErrorMessage(
        `Failed to load appointments: ${err.response?.data?.message || err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/appointments/status/${id}`, {
        status: newStatus,
        email: doctorEmail
      });
      
      // Update the local state to reflect the change
      setAppointments(prevAppointments => 
        prevAppointments.map(appt => 
          appt._id === id ? { ...appt, status: newStatus } : appt
        )
      );
    } catch (err) {
      console.error("Error updating appointment status:", err);
      alert(`Failed to update status: ${err.response?.data?.message || err.message}`);
    }
  };

  // Function to get status badge color
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "confirmed": return "success";
      case "cancelled": return "danger";
      case "pending": return "warning";
      default: return "secondary";
    }
  };

  // Helper to safely get patient name
  const getPatientName = (appointment) => {
    if (!appointment.patientId) return "N/A";
    
    if (typeof appointment.patientId === 'object') {
      return appointment.patientId.fullName || appointment.patientId.email || "N/A";
    }
    
    return "Patient #" + appointment.patientId;
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-sm border-0 p-4">
        <h3 className="mb-4">📅 All Appointments</h3>
        
        {errorMessage && (
          <div className="alert alert-danger mb-3">
            {errorMessage}
            <div className="mt-2">
              <small>Make sure you're logged in as a doctor account.</small>
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
            <p>Loading appointments...</p >
          </div>
        ) : appointments.length === 0 ? (
          <p>No appointments found.</p >
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Patient</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt._id}>
                  <td>{new Date(appt.date).toLocaleDateString()}</td>
                  <td>{appt.time || "N/A"}</td>
                  <td>{getPatientName(appt)}</td>
                  <td>{appt.reason}</td>
                  <td>
                    <Badge bg={getStatusBadgeVariant(appt.status)}>
                      {appt.status}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => updateAppointmentStatus(appt._id, "confirmed")}
                        disabled={appt.status === "confirmed"}
                      >
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => updateAppointmentStatus(appt._id, "cancelled")}
                        disabled={appt.status === "cancelled"}
                      >
                        Cancel
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
};

export default DoctorAppointments;