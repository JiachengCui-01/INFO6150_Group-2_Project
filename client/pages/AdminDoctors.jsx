import React, { useState, useEffect } from "react";
import api from "../api"; // ✅ 使用带 baseURL 的 axios 实例

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    userId: "",
    department: "",
    specialty: "",
    title: "",
    bio: "",
    phone: "",
    availableDays: "",
    avatar: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    api
      .get("/admin/doctors")
      .then((res) => {
        setDoctors(res.data);
      })
      .catch((err) => {
        console.error("❌ 获取医生失败:", err);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const checkUserValid = async (userId) => {
    try {
      const res = await api.get(`/admin/users/${userId}`);
      const user = res.data;
      console.log("👀 user 校验返回：", user);
      alert("Add Doctor successfully");
      return user && user.type?.trim() === "employee";
    } catch (err) {
      console.error("❌ 用户校验失败:", err);
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      const isValid = await checkUserValid(form.userId);
      if (!isValid) {
        alert("❌ 用户不存在，或不是 employee 类型！");
        return;
      }

      const payload = {
        ...form,
        availableDays: form.availableDays
          .split(",")
          .map((d) => d.trim())
          .filter((d) => d),
      };

      if (editId) {
        const res = await api.put(`/admin/doctors/${editId}`, payload);
        setDoctors((prev) =>
          prev.map((doc) => (doc._id === editId ? res.data : doc))
        );
        setEditId(null);
      } else {
        const res = await api.post("/admin/doctors", payload);
        setDoctors([...doctors, res.data]);
      }

      setForm({
        userId: "",
        department: "",
        specialty: "",
        title: "",
        bio: "",
        phone: "",
        availableDays: "",
        avatar: "",
      });
    } catch (err) {
      console.error("❌ 添加失败:", err.response?.data || err.message);
      alert("操作失败: " + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/doctors/${id}`);
      setDoctors((prev) => prev.filter((doc) => doc._id !== id));
    } catch (err) {
      alert("删除失败");
    }
  };

  const handleEdit = (doc) => {
    setEditId(doc._id);
    setForm({
      userId: doc.userId,
      department: doc.department,
      specialty: doc.specialty,
      title: doc.title,
      bio: doc.bio,
      phone: doc.phone,
      availableDays: doc.availableDays.join(", "),
      avatar: doc.avatar,
    });
  };

  const inputStyle = {
    flex: "1 1 200px",
    padding: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
  };

  const tdStyle = {
    padding: "0.75rem",
    borderTop: "1px solid #eee",
  };

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "#333" }}>
        👨‍⚕️ Manage Doctors
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        {Object.keys(form).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={form[key]}
            onChange={handleChange}
            style={inputStyle}
          />
        ))}
        <button
          onClick={handleSubmit}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {editId ? "Update Doctor" : "Add Doctor"}
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "#fff",
          boxShadow: "0 0 8px rgba(0,0,0,0.1)",
        }}
      >
        <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
          <tr>
            {[
              "Department",
              "Specialty",
              "Title",
              "Phone",
              "Available Days",
              "操作",
            ].map((header) => (
              <th
                key={header}
                style={{ padding: "0.75rem", textAlign: "left" }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc._id}>
              <td style={tdStyle}>{doc.department}</td>
              <td style={tdStyle}>{doc.specialty}</td>
              <td style={tdStyle}>{doc.title}</td>
              <td style={tdStyle}>{doc.phone}</td>
              <td style={tdStyle}>{doc.availableDays?.join(", ")}</td>
              <td style={tdStyle}>
                <button
                  onClick={() => handleEdit(doc)}
                  style={{ marginRight: "0.5rem" }}
                >
                  edit
                </button>
                <button onClick={() => handleDelete(doc._id)}>delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDoctors;
