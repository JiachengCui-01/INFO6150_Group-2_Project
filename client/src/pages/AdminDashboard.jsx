import React, { useEffect, useState } from 'react';
import { Container, Button, Table, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

function AdminDashboard() {
  const [view, setView] = useState('doctors');
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  const fetchDoctors = async () => {
    const res = await fetch('http://localhost:5000/api/admin/doctors');
    const data = await res.json();
    setDoctors(data);
  };

  const fetchPatients = async () => {
    const res = await fetch('http://localhost:5000/api/admin/patients');
    const data = await res.json();
    setPatients(data);
  };

  useEffect(() => {
    view === 'doctors' ? fetchDoctors() : fetchPatients();
  }, [view]);

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>
      <div className="text-center mb-4">
        <ToggleButtonGroup type="radio" name="view" value={view} onChange={setView}>
          <ToggleButton id="tbg-doctors" value="doctors" variant="outline-primary">
            Doctors
          </ToggleButton>
          <ToggleButton id="tbg-patients" value="patients" variant="outline-success">
            Patients
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {view === 'doctors' ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc._id}>
                <td>{doc.fullName}</td>
                <td>{doc.email}</td>
                <td>{doc.department}</td>
                <td>{doc.phone || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Blood Type</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((pat) => (
              <tr key={pat._id}>
                <td>{pat.fullName}</td>
                <td>{pat.email}</td>
                <td>{pat.gender}</td>
                <td>{pat.bloodType}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminDashboard;
