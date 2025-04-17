import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';

const PatientLookup = () => {
  const [email, setEmail] = useState('');
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setPatient(null);

    try {
      const res = await fetch(`/api/patients/profile?email=${email}`);
      if (!res.ok) throw new Error('Fetch failed');

      const data = await res.json();
      setPatient(data);
    } catch (err) {
      console.error(err);
      setError('Patient not found or server error.');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <h3 className="mb-3">🔍 Patient Lookup</h3>
          <Form onSubmit={handleSearch}>
            <Form.Group controlId="searchEmail">
              <Form.Label>Search by Patient Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter patient email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="mt-3">
              Search
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {error && (
        <Card className="border-0 bg-light text-danger mb-3 p-3">
          <strong>{error}</strong>
        </Card>
      )}

      {patient && (
        <Card className="shadow-sm border-0">
          <Card.Body>
            <h5>👤 Patient Details</h5>
            <Row>
              <Col md={6}>
                <p><strong>Gender:</strong> {patient.gender || 'N/A'}</p>
                <p><strong>Birth Date:</strong> {patient.birthDate ? patient.birthDate.substring(0, 10) : 'N/A'}</p>
                <p><strong>Blood Type:</strong> {patient.bloodType || 'N/A'}</p>
              </Col>
              <Col md={6}>
                <p><strong>Allergies:</strong> {patient.allergies?.length ? patient.allergies.join(', ') : 'None'}</p>
                <p><strong>Medical History:</strong> {patient.medicalHistory || 'None'}</p>
              </Col>
            </Row>

            <h6 className="mt-3">📞 Emergency Contact</h6>
            <p><strong>Name:</strong> {patient.emergencyContact?.name || 'N/A'}</p>
            <p><strong>Relationship:</strong> {patient.emergencyContact?.relationship || 'N/A'}</p>
            <p><strong>Phone:</strong> {patient.emergencyContact?.phone || 'N/A'}</p>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default PatientLookup;
