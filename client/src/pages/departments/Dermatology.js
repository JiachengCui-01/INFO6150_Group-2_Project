import React from 'react';
import DepartmentLayout from './DepartmentLayout';

function Dermatology() {
  return (
    <DepartmentLayout>
      <div className="text-white">
        <h2 className="mb-4">🌿 Department of Dermatology</h2>

        <section className="mb-4">
          <h4>About Us</h4>
          <p>
            Our Dermatology Department specializes in diagnosing and treating a variety of skin, hair, and nail conditions.
            We offer medical, surgical, and cosmetic dermatologic care using the latest therapeutic techniques.
          </p>
        </section>

        <section className="mb-4">
          <h4>Consultation Hours</h4>
          <ul>
            <li>Monday – Friday: 8:30 AM – 4:30 PM</li>
            <li>Saturday: 9:00 AM – 12:30 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </section>

        <section className="mb-4">
          <h4>Specialized Services</h4>
          <ul>
            <li>Treatment of acne, eczema, and psoriasis</li>
            <li>Skin cancer screening and mole removal</li>
            <li>Laser skin rejuvenation</li>
            <li>Hair loss evaluation and treatment</li>
          </ul>
        </section>
      </div>
    </DepartmentLayout>
  );
}

export default Dermatology;
