import React from 'react';
import DepartmentLayout from './DepartmentLayout';

function Ophthalmology() {
  return (
    <DepartmentLayout>
      <div className="text-white">
        <h2 className="mb-4">👁️ Department of Ophthalmology</h2>

        <section className="mb-4">
          <h4>About Us</h4>
          <p>
            The Ophthalmology Department provides comprehensive eye care, including vision correction, eye disease treatment,
            and surgical interventions. We are equipped with the latest technology to diagnose and manage conditions
            affecting the eyes and visual system.
          </p>
        </section>

        <section className="mb-4">
          <h4>Consultation Hours</h4>
          <ul>
            <li>Monday – Friday: 8:30 AM – 5:30 PM</li>
            <li>Saturday: 9:00 AM – 1:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </section>

        <section className="mb-4">
          <h4>Specialized Services</h4>
          <ul>
            <li>Comprehensive eye exams</li>
            <li>Cataract and glaucoma surgery</li>
            <li>Diabetic eye disease management</li>
            <li>Laser vision correction</li>
          </ul>
        </section>
      </div>
    </DepartmentLayout>
  );
}

export default Ophthalmology;
