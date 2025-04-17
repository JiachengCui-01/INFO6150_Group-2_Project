import React from 'react';
import DepartmentLayout from './DepartmentLayout';

function Surgery() {
  return (
    <DepartmentLayout>
      <div className="text-white">
        <h2 className="mb-4">🔪 Department of Surgery</h2>

        {/* 科室介绍 */}
        <section className="mb-4">
          <h4>About Us</h4>
          <p>
            The Department of Surgery offers state-of-the-art surgical care across a broad range of specialties, including general surgery,
            orthopedic surgery, neurosurgery, and minimally invasive procedures. Our team is composed of board-certified surgeons
            supported by a multidisciplinary staff, providing high-quality care with advanced technology and compassionate support.
          </p>
        </section>

        {/* 候诊时间 */}
        <section className="mb-4">
          <h4>Consultation Hours</h4>
          <ul>
            <li>Monday – Friday: 9:00 AM – 6:00 PM</li>
            <li>Saturday: 9:00 AM – 2:00 PM</li>
            <li>Sunday: Emergency surgeries only</li>
          </ul>
        </section>

        {/* 特色服务 */}
        <section className="mb-4">
          <h4>Specialized Services</h4>
          <ul>
            <li>Minimally invasive laparoscopic surgeries</li>
            <li>Trauma and emergency surgical care</li>
            <li>Post-operative rehabilitation coordination</li>
            <li>Advanced surgical imaging and diagnostics</li>
          </ul>
        </section>
      </div>
    </DepartmentLayout>
  );
}

export default Surgery;
