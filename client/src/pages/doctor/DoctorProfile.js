import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const DoctorProfile = () => {
  const [profile, setProfile] = useState({
    department: '',
    specialty: '',
    title: '',
    bio: '',
    phone: '',
    availableDays: [],
  });

  const [availableDaysOptions] = useState([
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ]);

  const email = localStorage.getItem('userEmail'); // Assuming email is stored at login

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`/api/doctor/profile?email=${email}`);
        setProfile(res.data);
      } catch (err) {
        console.error('Error loading doctor profile', err);
      }
    };

    fetchProfile();
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (day) => {
    setProfile((prev) => {
      const isChecked = prev.availableDays.includes(day);
      return {
        ...prev,
        availableDays: isChecked
          ? prev.availableDays.filter((d) => d !== day)
          : [...prev.availableDays, day],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/doctor/profile', { ...profile, email });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile', err);
      alert('Failed to update profile.');
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h3 className="mb-4">👤 My Profile</h3>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    name="department"
                    value={profile.department}
                    onChange={handleChange}
                    placeholder="e.g., Cardiology"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Specialty</Form.Label>
                  <Form.Control
                    type="text"
                    name="specialty"
                    value={profile.specialty}
                    onChange={handleChange}
                    placeholder="e.g., Heart Surgery"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={profile.title}
                    onChange={handleChange}
                    placeholder="e.g., MD, DO"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    placeholder="e.g., (123) 456-7890"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                rows={3}
                placeholder="Short description about your expertise"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Available Days</Form.Label>
              <div className="d-flex flex-wrap">
                {availableDaysOptions.map((day) => (
                  <Form.Check
                    inline
                    key={day}
                    type="checkbox"
                    label={day}
                    checked={profile.availableDays.includes(day)}
                    onChange={() => handleCheckbox(day)}
                  />
                ))}
              </div>
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DoctorProfile;
