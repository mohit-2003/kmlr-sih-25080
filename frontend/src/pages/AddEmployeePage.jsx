import React, { useState, useEffect } from "react";

import { UserPlus, User, Lock, Briefcase, Building2, Mail } from "lucide-react";

import InputWithIcon from "../components/ui/input-with-icon";
import Button from "../components/ui/button";
import FormGroup from "../components/ui/formGroup";
import Card from "../components/ui/card";

import { useAuth } from "../context/AuthContext";

const AddEmployeePage = () => {
  const { role, departmentId, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    employeeType: "",
    department: "",
  });

  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  console.log("ROLE:", role);
  console.log("DEPARTMENT ID:", departmentId);
  console.log("AUTH LOADING:", authLoading);

  // PREFILL when AuthContext is ready
  useEffect(() => {
    if (authLoading) return;

    setFormData({
      name: "",
      email: "",
      password: "",
      employeeType: role === "ADMIN" ? "EMPLOYEE" : "",
      department: role === "ADMIN" ? departmentId : "",
    });

    setInitialized(true);
  }, [authLoading, role, departmentId]);

  // FETCH DEPARTMENTS
  useEffect(() => {
    const API_BASE = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";

    fetch(`${API_BASE}/api/v1/departments`)
      .then((res) => res.json())
      .then((data) => setAvailableDepartments(data.departments || []))
      .catch(() => setAvailableDepartments([]));
  }, []);

  // EMPLOYEE TYPES BASED ON ROLE
  const employeeTypes =
    role === "SUPER_ADMIN"
      ? [
          { value: "ADMIN", label: "Admin" },
          { value: "EMPLOYEE", label: "Employee" },
        ]
      : [{ value: "EMPLOYEE", label: "Employee" }];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError("");
    setSuccess("");

    const API_BASE = import.meta.env.VITE_SERVER_URL || "http://localhost:3001";

    // VALIDATION
    if (!formData.name.trim()) {
      setError("Name is required");
      setSubmitLoading(false);
      return;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      setSubmitLoading(false);
      return;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      setSubmitLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setSubmitLoading(false);
      return;
    }
    if (!formData.employeeType) {
      setError("Role is required");
      setSubmitLoading(false);
      return;
    }
    if (role !== "ADMIN" && !formData.department) {
      setError("Department is required");
      setSubmitLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.employeeType,
          department_id: formData.department,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setSuccess("Employee added successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
        employeeType: role === "ADMIN" ? "EMPLOYEE" : "",
        department: role === "ADMIN" ? departmentId : "",
      });

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (!initialized) return null; // Wait until prefilled

  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto">
      <Card className="p-6 sm:p-8">
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
          <UserPlus className="text-blue-600" /> Add Employee
        </h1>
      </Card>

      <Card className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          <FormGroup label="Name">
            <InputWithIcon
              icon={User}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              required
            />
          </FormGroup>

          <FormGroup label="Email">
            <InputWithIcon
              icon={Mail}
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </FormGroup>

          <FormGroup label="Password">
            <InputWithIcon
              icon={Lock}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </FormGroup>

          <FormGroup label="Employee Type">
            <select
              name="employeeType"
              value={formData.employeeType}
              onChange={handleChange}
              disabled={role === "ADMIN"}
              className="w-full px-4 py-3 border rounded-xl"
              required
            >
              <option value="">Select role</option>
              {employeeTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </FormGroup>

          <FormGroup label="Department">
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              disabled={role === "ADMIN"}
              className="w-full px-4 py-3 border rounded-xl"
              required
            >
              <option value="">Select department</option>
              {availableDepartments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </FormGroup>

          {error && <div className="p-4 bg-red-100 text-red-700">{error}</div>}
          {success && <div className="p-4 bg-green-100 text-green-700">{success}</div>}

          <Button disabled={submitLoading}>
            {submitLoading ? "Adding..." : "Add Employee"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddEmployeePage;
