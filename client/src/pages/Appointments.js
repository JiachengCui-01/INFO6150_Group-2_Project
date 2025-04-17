import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  // 按科室组织的医生数据
  const [doctorsByDepartment, setDoctorsByDepartment] = useState({
    'Cardiology': [
      { _id: '101', fullName: 'Dr. Lee' },
      { _id: '102', fullName: 'Dr. Smith' }
    ],
    'Neurology': [
      { _id: '201', fullName: 'Dr. Wang' },
      { _id: '202', fullName: 'Dr. Chen' }
    ],
    'Pediatrics': [
      { _id: '301', fullName: 'Dr. Wilson' },
      { _id: '302', fullName: 'Dr. Garcia' }
    ],
    'Orthopedics': [
      { _id: '401', fullName: 'Dr. Johnson' },
      { _id: '402', fullName: 'Dr. Martinez' }
    ],
    'Dermatology': [
      { _id: '501', fullName: 'Dr. Taylor' },
      { _id: '502', fullName: 'Dr. Brown' }
    ],
    'Ophthalmology': [
      { _id: '601', fullName: 'Dr. Davis' },
      { _id: '602', fullName: 'Dr. White' }
    ],
    'General Medicine': [
      { _id: '701', fullName: 'Dr. Lopez' },
      { _id: '702', fullName: 'Dr. Miller' }
    ]
  });
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    doctorId: '',
    department: '',
    date: '',
    time: '',
    reason: ''
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
  const userRole = localStorage.getItem('userRole');
  
  // 添加返回首页功能
  const handleGoBack = () => {
    navigate('/home');
  };
  
  // 获取今天的日期字符串，格式为YYYY-MM-DD
  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // 生成9:00-16:00之间的整点和半点时间选项
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 16; hour++) {
      for (let minute of [0, 30]) {
        const hourStr = String(hour).padStart(2, '0');
        const minStr = String(minute).padStart(2, '0');
        options.push(`${hourStr}:${minStr}`);
      }
    }
    return options;
  };
  
  useEffect(() => {
    // 检查用户权限
    if (!userEmail || userRole !== 'client') {
      navigate('/login');
      return;
    }
    
    // 加载预约数据
    fetchAppointments();
    
    // 从API加载医生数据（如果API尚未实现，使用默认数据）
    fetchDoctorsByDepartment();
  }, [userEmail, userRole, navigate]);
  
  // 当科室选择变化时，更新可选医生列表
  useEffect(() => {
    if (newAppointment.department) {
      setAvailableDoctors(doctorsByDepartment[newAppointment.department] || []);
      // 重置医生选择
      setNewAppointment(prev => ({
        ...prev,
        doctorId: ''
      }));
    } else {
      setAvailableDoctors([]);
    }
  }, [newAppointment.department, doctorsByDepartment]);
  
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/appointments/patient?email=${userEmail}`);
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        console.error('Failed to fetch appointments');
        setErrorMessage('Failed to load appointments');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchDoctorsByDepartment = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/appointments/doctors');
      if (response.ok) {
        const data = await response.json();
        // 如果API返回了医生数据，按科室组织
        if (data.length > 0) {
          const doctorsByDept = {};
          data.forEach(doctor => {
            if (!doctorsByDept[doctor.department]) {
              doctorsByDept[doctor.department] = [];
            }
            doctorsByDept[doctor.department].push(doctor);
          });
          setDoctorsByDepartment(doctorsByDept);
        }
        // 如果API没有返回数据，使用默认数据（已在状态初始化时设置）
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setErrorMessage('Failed to load doctors');
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment({
      ...newAppointment,
      [name]: value
    });
    // 清除之前的错误消息
    setErrorMessage('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 验证医生选择
    if (!newAppointment.doctorId) {
      setErrorMessage('Please select a doctor');
      return;
    }
    
    try {
      // 打印将要发送的数据，帮助调试
      console.log('Sending appointment data:', {
        email: userEmail,
        ...newAppointment
      });
      
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          ...newAppointment
        }),
      });
      
      
      const responseData = await response.json();
      
      if (response.ok) {
        alert('Appointment booked successfully!');
        setNewAppointment({
          doctorId: '',
          department: '',
          date: '',
          time: '',
          reason: ''
        });
        fetchAppointments(); // 刷新预约列表
      } else {
        // 处理错误响应
        setErrorMessage(responseData.message || 'Failed to book appointment');
      }
    } catch (err) {
      setErrorMessage(`An error occurred: ${err.message}. Please try again.`);
    }
  };
  
  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/cancel/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });
      
      if (response.ok) {
        alert('Appointment cancelled successfully!');
        fetchAppointments(); // 刷新预约列表
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Failed to cancel appointment');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('An error occurred. Please try again.');
    }
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="badge bg-warning">Pending</span>;
      case 'confirmed':
        return <span className="badge bg-success">Confirmed</span>;
      case 'cancelled':
        return <span className="badge bg-danger">Cancelled</span>;
      case 'completed':
        return <span className="badge bg-info">Completed</span>;
      default:
        return <span className="badge bg-secondary">Unknown</span>;
    }
  };
  
  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }
  
  return (
    <>
      <div className="login-background"></div>
      <div className="container mt-5">
        {/* 添加返回按钮 */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="text-white">Appointment Management</h2>
          <button className="btn btn-outline-light" onClick={handleGoBack}>
            Back to Home
          </button>
        </div>
        
        {/* 错误消息提示 */}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
        
        {/* Book New Appointment */}
        <div className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h4>Schedule New Appointment</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Department</label>
                  <select
                    className="form-select"
                    name="department"
                    value={newAppointment.department}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Select Department --</option>
                    {Object.keys(doctorsByDepartment).map(dept => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Select Doctor</label>
                  <select
                    className="form-select"
                    name="doctorId"
                    value={newAppointment.doctorId}
                    onChange={handleInputChange}
                    required
                    disabled={!newAppointment.department}
                  >
                    <option value="">-- Select Doctor --</option>
                    {availableDoctors.map(doctor => (
                      <option key={doctor._id} value={doctor._id}>
                        {doctor.fullName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={newAppointment.date}
                    onChange={handleInputChange}
                    min={getTodayString()} // 设置最小日期为今天
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Time</label>
                  <select
                    className="form-select"
                    name="time"
                    value={newAppointment.time}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Select Time --</option>
                    {generateTimeOptions().map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Reason for Visit</label>
                <textarea
                  className="form-control"
                  name="reason"
                  rows="3"
                  value={newAppointment.reason}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary">Book Appointment</button>
            </form>
          </div>
        </div>
        
        {/* My Appointments */}
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h4>My Appointments</h4>
          </div>
          <div className="card-body">
            {appointments.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Doctor</th>
                      <th>Department</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map(appointment => (
                      <tr key={appointment._id}>
                        <td>{appointment.doctorId.fullName}</td>
                        <td>{appointment.department}</td>
                        <td>{new Date(appointment.date).toLocaleDateString()}</td>
                        <td>{appointment.time}</td>
                        <td>{getStatusBadge(appointment.status)}</td>
                        <td>
                          {appointment.status === 'pending' && (
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleCancel(appointment._id)}
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center">No appointment records. Book your first appointment now!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointments;