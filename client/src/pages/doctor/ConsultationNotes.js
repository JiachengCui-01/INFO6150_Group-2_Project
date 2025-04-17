import React, { useState } from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';

const ConsultationNotes = () => {
  const [email, setEmail] = useState('');
  const [patient, setPatient] = useState(null);
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage('');
    setPatient(null);
    setNotes('');

    try {
      const res = await fetch(`/api/patients/profile?email=${email}`);
      if (!res.ok) throw new Error('Patient not found');
      const data = await res.json();
      setPatient(data);
      setNotes(data.consultationNotes || '');
    } catch (err) {
      setMessage('❌ Patient not found.');
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/patients/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, consultationNotes: notes }),
      });

      if (!res.ok) throw new Error('Save failed');
      setMessage('✅ Notes saved successfully.');
    } catch (err) {
      setMessage('❌ Failed to save notes.');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <h3>📝 Consultation Notes</h3>
          <Form onSubmit={handleSearch}>
            <Form.Group className="mb-3">
              <Form.Label>Search by Patient Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter patient email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit">Search</Button>
          </Form>
        </Card.Body>
      </Card>

      {patient && (
        <Card className="shadow-sm border-0 mb-4">
          <Card.Body>
            <h5>👤 {email}</h5>
            <Form.Group className="mb-3 mt-3">
              <Form.Label>Consultation Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your notes here..."
              />
            </Form.Group>
            <Button variant="success" onClick={handleSave}>
              Save Notes
            </Button>
          </Card.Body>
        </Card>
      )}

      {message && (
        <Card className="bg-light border-0 p-3 text-center">
          <strong>{message}</strong>
        </Card>
      )}
    </Container>
  );
};

export default ConsultationNotes;
