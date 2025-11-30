import React, { useState } from "react";
import {
  UserPlus,
  User,
  Lock,
  Briefcase,
  Building2,
} from "lucide-react";

import InputWithIcon from "@/components/ui/input-with-icon";
import Button from "@/components/ui/button";
import FormGroup from "@/components/ui/formGroup";
import Card from "@/components/ui/card";

const AddEmployeePage = () => {
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
    employeeType: "",
    departments: [],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const employeeTypes = [
    { value: "admin", label: "Administrator" },
    { value: "manager", label: "Manager" },
    { value: "employee", label: "Employee" },
    { value: "viewer", label: "Viewer" },
  ];

  const availableDepartments = [
    "Engineering",
    "HR",
    "Finance",
    "Safety",
    "Legal",
    "Procurement",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleDepartmentChange = (dept) => {
    setFormData((prev) => ({
      ...prev,
      departments: prev.departments.includes(dept)
        ? prev.departments.filter((d) => d !== dept)
        : [...prev.departments, dept],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!formData.loginId.trim()) {
      setError("Login ID is required");
      setLoading(false);
      return;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }
    if (!formData.employeeType) {
      setError("Employee type is required");
      setLoading(false);
      return;
    }
    if (formData.departments.length === 0) {
      setError("Select at least one department");
      setLoading(false);
      return;
    }

    try {
      const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001";

      const res = await fetch(`${API_BASE}/api/v1/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        throw new Error(data.error || "Failed to add employee");
      }

      setSuccess("Employee added successfully!");
      setFormData({
        loginId: "",
        password: "",
        employeeType: "",
        departments: [],
      });

      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Failed to add employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* PAGE HEADER - MATCHES OTHER PAGES */}
      <Card className="p-8">
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
          <UserPlus className="text-blue-600" />
          Add Employee
        </h1>
        <p className="text-gray-600">
          Create a new employee and assign login credentials, type, and departments.
        </p>
      </Card>

      {/* FORM CONTAINER */}
      <Card className="p-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Login ID */}
          <FormGroup label="Login ID" htmlFor="loginId">
            <InputWithIcon
              icon={User}
              id="loginId"
              name="loginId"
              type="text"
              placeholder="Enter login ID"
              value={formData.loginId}
              onChange={handleChange}
              required
            />
          </FormGroup>

          {/* Password */}
          <FormGroup label="Password" htmlFor="password">
            <InputWithIcon
              icon={Lock}
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </FormGroup>

          {/* Employee Type */}
          <FormGroup label="Employee Type">
            <div className="relative">
              <Briefcase
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <select
                name="employeeType"
                value={formData.employeeType}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-10 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select employee type</option>
                {employeeTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </FormGroup>

          {/* Departments */}
          <FormGroup label="Departments">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Building2 size={16} />
                Select one or more departments
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableDepartments.map((dept) => (
                  <label
                    key={dept}
                    className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition ${
                      formData.departments.includes(dept)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.departments.includes(dept)}
                      onChange={() => handleDepartmentChange(dept)}
                    />
                    <span className="text-sm font-medium">{dept}</span>
                  </label>
                ))}
              </div>
            </div>
          </FormGroup>

          {/* Messages */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
              {error}
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <UserPlus size={18} />
                Adding...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <UserPlus size={18} />
                Add Employee
              </span>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddEmployeePage;
