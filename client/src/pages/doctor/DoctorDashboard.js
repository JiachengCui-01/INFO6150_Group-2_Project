import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Doctor';

  return (
    <Container className="mt-5">
      <Card className="shadow-sm border-0 mb-4 bg-light">
        <Card.Body>
          <h3 className="mb-1">👋 Welcome back, {userName}</h3>
          <p className="text-muted">Here’s your dashboard overview for today.</p>
        </Card.Body>
      </Card>

      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <Card.Title>📅 Today's Appointments</Card.Title>
              <Card.Text className="text-muted">
                You have <strong>6</strong> appointments scheduled today.
              </Card.Text>
              <Button variant="primary" className="w-100" onClick={() => navigate('/doctor/appointments')}>
                View Appointments
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <Card.Title>🩺 Patient Records</Card.Title>
              <Card.Text className="text-muted">
                Search and review your patients' medical histories.
              </Card.Text>
              <Button variant="outline-primary" className="w-100" onClick={() => navigate('/doctor/patients')}>
                Search Patients
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body>
              <Card.Title>👤 My Profile</Card.Title>
              <Card.Text className="text-muted">
                Update your specialty, contact info, and availability.
              </Card.Text>
              <Button variant="outline-secondary" className="w-100" onClick={() => navigate('/doctor/profile')}>
                Edit Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="shadow-sm border-0 bg-light">
            <Card.Body>
              <Card.Title>📢 Announcements</Card.Title>
              <ul className="mb-0 text-muted">
                <li>🕓 Staff meeting today at 4:00 PM (Room 301)</li>
                <li>💉 New flu vaccine guidelines available</li>
                <li>📝 Complete all consultation notes by EOD</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorDashboard;
