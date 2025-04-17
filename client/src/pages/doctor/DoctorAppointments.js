import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Spinner } from 'react-bootstrap';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const doctorEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(`/api/appointments/doctor`);
        const data = await res.json();
        if (res.ok) {
          setAppointments(data);
        } else {
          console.error('Failed to fetch appointments:', data.message);
        }
      } catch (err) {
        console.error('Error fetching appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorEmail]);

  return (
    <Container className="mt-5">
      <Card className="shadow-sm border-0 p-4">
        <h3 className="mb-4">📅 My Appointments</h3>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
            <p>Loading appointments...</p >
          </div>
        ) : appointments.length === 0 ? (
          <p>No appointments found.</p >
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Client</th> {/* ✅ Changed from 'Patient' to 'Client' */}
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt._id}>
                  <td>{new Date(appt.date).toLocaleString()}</td>
                  <td>{appt.patientName || 'N/A'}</td> {/* name key can stay as patientName */}
                  <td>{appt.reason}</td>
                  <td>{appt.status}</td>
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