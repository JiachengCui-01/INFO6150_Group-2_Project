import React from 'react';
import DepartmentLayout from './DepartmentLayout';

function InternalMedicine() {
  return (
    <DepartmentLayout>
      <div className="text-white">
        <h2 className="mb-4">🏥 Department of Internal Medicine</h2>

        {/* 科室介绍 */}
        <section className="mb-4">
          <h4>About Us</h4>
          <p>
            The Department of Internal Medicine provides comprehensive care for adult patients with a wide range of conditions,
            including chronic diseases, acute illnesses, and preventive care. Our experienced team of internists focuses on the
            diagnosis and non-surgical treatment of complex medical conditions.
          </p>
        </section>

        {/* 候诊时间 */}
        <section className="mb-4">
          <h4>Consultation Hours</h4>
          <ul>
            <li>Monday – Friday: 8:30 AM – 5:00 PM</li>
            <li>Saturday: 9:00 AM – 1:00 PM</li>
            <li>Sunday: Closed</li>
          </ul>
        </section>

        {/* 特色服务 */}
        <section className="mb-4">
          <h4>Specialized Services</h4>
          <ul>
            <li>Chronic disease management (e.g., diabetes, hypertension)</li>
            <li>Preventive health screenings and physical exams</li>
            <li>Coordination with specialty departments for complex cases</li>
            <li>On-site laboratory and diagnostic imaging</li>
          </ul>
        </section>
      </div>
    </DepartmentLayout>
  );
}

export default InternalMedicine;
