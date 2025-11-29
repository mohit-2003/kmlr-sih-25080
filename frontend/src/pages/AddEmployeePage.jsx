import React, { useState } from "react";
import { UserPlus, User, Lock, Briefcase, Building2 } from "lucide-react";
import InputWithIcon from "../components/ui/input-with-icon";
import Button from "../components/ui/button";
import FormGroup from "../components/ui/formGroup";
import Card from "../components/ui/card";

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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setSuccess("");
  };

  const handleDepartmentChange = (dept) => {
    setFormData((prev) => {
      const departments = prev.departments.includes(dept)
        ? prev.departments.filter((d) => d !== dept)
        : [...prev.departments, dept];
      return { ...prev, departments };
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validation
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
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }
    if (!formData.employeeType) {
      setError("Employee type is required");
      setLoading(false);
      return;
    }
    if (formData.departments.length === 0) {
      setError("At least one department must be selected");
      setLoading(false);
      return;
    }

    try {
      // TODO: Replace with actual API call
      const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3001";
      
      const response = await fetch(`${API_BASE}/api/v1/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loginId: formData.loginId.trim(),
          password: formData.password,
          employeeType: formData.employeeType,
          departments: formData.departments,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(data.error || "Failed to add employee");
      }

      // Success
      setSuccess("Employee added successfully!");
      setFormData({
        loginId: "",
        password: "",
        employeeType: "",
        departments: [],
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Error adding employee:", err);
      setError(err.message || "Failed to add employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <UserPlus className="text-blue-600" /> Add Employee
      </h1>

      <p className="text-gray-600 mb-6">
        Create a new employee account and assign login credentials, employee type, and departments.
      </p>

      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Login ID */}
          <FormGroup label="Login ID" htmlFor="loginId">
            <InputWithIcon
              icon={User}
              id="loginId"
              name="loginId"
              type="text"
              value={formData.loginId}
              onChange={handleChange}
              placeholder="Enter login ID (e.g., emp001 or email)"
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password (min. 6 characters)"
              required
              minLength={6}
            />
          </FormGroup>

          {/* Employee Type */}
          <FormGroup label="Employee Type" htmlFor="employeeType">
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={18} />
              <select
                id="employeeType"
                name="employeeType"
                value={formData.employeeType}
                onChange={handleChange}
                className="block w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition appearance-none"
                required
              >
                <option value="">Select employee type</option>
                {employeeTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </FormGroup>

          {/* Departments */}
          <FormGroup label="Departments" htmlFor="departments">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <Building2 size={16} />
                <span>Select one or more departments</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableDepartments.map((dept) => (
                  <label
                    key={dept}
                    className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.departments.includes(dept)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.departments.includes(dept)}
                      onChange={() => handleDepartmentChange(dept)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">{dept}</span>
                  </label>
                ))}
              </div>
            </div>
          </FormGroup>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Adding Employee...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <UserPlus size={18} /> Add Employee
              </span>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddEmployeePage;

