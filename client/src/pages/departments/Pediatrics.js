import React from 'react';
import DepartmentLayout from './DepartmentLayout';

function Pediatrics() {
  return (
    <DepartmentLayout>
      <div className="text-white">
        <h2 className="mb-4">🧒 Department of Pediatrics</h2>

        <section className="mb-4">
          <h4>About Us</h4>
          <p>
            The Pediatrics Department specializes in the medical care of infants, children, and adolescents.
            Our pediatricians are dedicated to promoting healthy growth and development while providing
            treatment for both acute and chronic pediatric conditions.
          </p>
        </section>

        <section className="mb-4">
          <h4>Consultation Hours</h4>
          <ul>
            <li>Monday – Friday: 8:00 AM – 4:00 PM</li>
            <li>Saturday: 9:00 AM – 12:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </section>

        <section className="mb-4">
          <h4>Specialized Services</h4>
          <ul>
            <li>Child growth monitoring and vaccination</li>
            <li>Diagnosis and management of childhood illnesses</li>
            <li>Pediatric emergency services</li>
            <li>Parental guidance and developmental support</li>
          </ul>
        </section>
      </div>
    </DepartmentLayout>
  );
}

export default Pediatrics;
