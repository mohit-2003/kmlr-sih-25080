import React, { useState } from "react";
import { Building2, Plus } from "lucide-react";

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState([
    "Engineering",
    "HR",
    "Finance",
    "Safety",
    "Legal",
    "Procurement",
  ]);
  const [newDept, setNewDept] = useState("");

  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (!newDept.trim()) return;

    // Add department (dummy for now, later connect API)
    setDepartments([...departments, newDept.trim()]);
    setNewDept("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Building2 className="text-blue-600" /> Departments
      </h1>

      <p className="text-gray-600 mb-6">
        Manage departments to organize and classify documents.
      </p>

      {/* Add Department Form */}
      <form
        onSubmit={handleAddDepartment}
        className="flex gap-3 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200"
      >
        <input
          type="text"
          placeholder="Enter new department name"
          value={newDept}
          onChange={(e) => setNewDept(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} /> Add
        </button>
      </form>

      {/* Department List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departments.map((dept, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-gray-800 font-semibold">{dept}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentsPage;
