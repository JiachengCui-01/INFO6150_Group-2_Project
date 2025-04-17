import React from 'react';
import DepartmentLayout from './DepartmentLayout';

function Neurosurgery() {
  return (
    <DepartmentLayout>
      <div className="text-white">
        <h2 className="mb-4">🧠 Department of Neurosurgery</h2>

        <section className="mb-4">
          <h4>About Us</h4>
          <p>
            The Neurosurgery Department provides advanced surgical care for diseases of the brain, spine, and nervous system.
            Our expert surgeons use cutting-edge technology to perform life-saving procedures with precision and care.
          </p>
        </section>

        <section className="mb-4">
          <h4>Consultation Hours</h4>
          <ul>
            <li>Monday – Friday: 9:00 AM – 5:00 PM</li>
            <li>Saturday: 9:00 AM – 12:00 PM</li>
            <li>Sunday: Emergency only</li>
          </ul>
        </section>

        <section className="mb-4">
          <h4>Specialized Services</h4>
          <ul>
            <li>Brain tumor removal and spinal surgery</li>
            <li>Minimally invasive neurosurgical techniques</li>
            <li>Stroke and trauma intervention</li>
            <li>Post-operative rehabilitation programs</li>
          </ul>
        </section>
      </div>
    </DepartmentLayout>
  );
}

export default Neurosurgery;
