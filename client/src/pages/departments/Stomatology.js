import React from 'react';
import DepartmentLayout from './DepartmentLayout';

function Stomatology() {
  return (
    <DepartmentLayout>
      <div className="text-white">
        <h2 className="mb-4">🦷 Department of Stomatology</h2>

        <section className="mb-4">
          <h4>About Us</h4>
          <p>
            The Stomatology Department is responsible for the diagnosis, prevention, and treatment of oral diseases.
            Our dental professionals provide a full range of dental services, from routine cleanings to complex
            oral surgery.
          </p>
        </section>

        <section className="mb-4">
          <h4>Consultation Hours</h4>
          <ul>
            <li>Monday – Friday: 9:00 AM – 6:00 PM</li>
            <li>Saturday: 9:00 AM – 2:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </section>

        <section className="mb-4">
          <h4>Specialized Services</h4>
          <ul>
            <li>Routine dental exams and cleaning</li>
            <li>Orthodontic and prosthodontic services</li>
            <li>Oral and maxillofacial surgery</li>
            <li>Cosmetic dental treatments</li>
          </ul>
        </section>
      </div>
    </DepartmentLayout>
  );
}

export default Stomatology;
