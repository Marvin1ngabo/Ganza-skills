import { useMemo, useState } from "react";
import { LayoutDashboard, Table2, Users, GraduationCap, Globe, Building, Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { departments, skills, employees, computeSkillGaps } from "./data/mockData.js";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const TEXTS = {
  en: {
    dashboard: "Dashboard",
    skillsMatrix: "Skills Matrix",
    employeeDirectory: "Employee Directory",
    employeeManagement: "Employee Management",
    learningPaths: "Learning Paths",
    departmentManagement: "Department Management",
    skillsManagement: "Skills Management",
    departmentReadiness: "Department Readiness",
    topSkillGaps: "Top 3 Skills Gaps",
    searchEmployees: "Search employees...",
    language: "Kinyarwanda",
    score: "Score",
    department: "Department",
    addDepartment: "Add Department",
    editDepartment: "Edit Department",
    deleteDepartment: "Delete Department",
    departmentName: "Department Name",
    readiness: "Readiness",
    actions: "Actions",
    save: "Save",
    cancel: "Cancel",
    addNew: "Add New",
    adminPanel: "Admin Panel",
    employeeName: "Employee Name",
    skills: "Skills",
    addEmployee: "Add Employee",
    editEmployee: "Edit Employee",
    deleteEmployee: "Delete Employee",
    skillLevel: "Skill Level",
    skillName: "Skill Name",
    addSkill: "Add Skill",
    editSkill: "Edit Skill",
    deleteSkill: "Delete Skill",
    averageScore: "Average Score",
    totalEmployees: "Total Employees"
  },
  rw: {
    dashboard: "Ibibaho",
    skillsMatrix: "Imbonerahamwe y'Ubumenyi",
    employeeDirectory: "Urutonde rw'Abakozi",
    employeeManagement: "Ukuyobora Abakozi",
    learningPaths: "Inyigisho",
    departmentManagement: "Ukuyobora Amashami",
    skillsManagement: "Ukuyobora Ubumenyi",
    departmentReadiness: "Uko Amashami yiteguye",
    topSkillGaps: "Imyanya 3 y'Ubumenyi ibura",
    searchEmployees: "Shakisha abakozi...",
    language: "English",
    score: "Amanota",
    department: "Ishami",
    addDepartment: "Ongeraho Ishami",
    editDepartment: "Hindura Ishami",
    deleteDepartment: "Siba Ishami",
    departmentName: "Izina ry'Ishami",
    readiness: "Ubugenzwe",
    actions: "Ibikorwa",
    save: "Bika",
    cancel: "Kuraho",
    addNew: "Ongeraho",
    adminPanel: "Urwego rwa Muyobozi",
    employeeName: "Izina ry'Umukozi",
    skills: "Ubumenyi",
    addEmployee: "Ongeraho Umukozi",
    editEmployee: "Hindura Umukozi",
    deleteEmployee: "Siba Umukozi",
    skillLevel: "Urwego r'Ubumenyi",
    skillName: "Izina ry'Ubumenyi",
    addSkill: "Ongeraho Ubumenyi",
    editSkill: "Hindura Ubumenyi",
    deleteSkill: "Siba Ubumenyi",
    averageScore: "Mwangavu",
    totalEmployees: "Umubare w'Abakozi"
  }
};

function Sidebar({ current, onNavigate, t, isAdmin }) {
  const links = [
    { key: "dashboard", label: t.dashboard, icon: LayoutDashboard },
    { key: "skillsMatrix", label: t.skillsMatrix, icon: Table2 },
    { key: "employeeDirectory", label: t.employeeDirectory, icon: Users },
    { key: "learningPaths", label: t.learningPaths, icon: GraduationCap }
  ];
  
  if (isAdmin) {
    links.push(
      { key: "employeeManagement", label: t.employeeManagement, icon: Users },
      { key: "departmentManagement", label: t.departmentManagement, icon: Building },
      { key: "skillsManagement", label: t.skillsManagement, icon: GraduationCap }
    );
  }
  
  return (
    <aside className="w-64 h-full border-r border-gray-200 bg-white">
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gray-800" />
          <span className="text-lg font-semibold text-gray-900">Ganza Skills</span>
        </div>
      </div>
      <nav className="px-2 space-y-1">
        {links.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onNavigate(key)}
            className={`nav-link w-full justify-start ${current === key ? "nav-link-active" : ""}`}
          >
            <Icon className="h-5 w-5" />
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function Dashboard({ t }) {
  const data = departments.map((d) => ({ name: d.name, readiness: d.readiness }));
  const gaps = computeSkillGaps(employees, skills);
  return (
    <div className="space-y-6">
      <section className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">{t.departmentReadiness}</h2>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Bar dataKey="readiness" fill="#374151" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className="card p-4">
        <h2 className="text-lg font-semibold mb-3">{t.topSkillGaps}</h2>
        <ul className="divide-y">
          {gaps.map((g) => (
            <li key={g.skill} className="py-3 flex items-center justify-between">
              <span className="font-medium">{g.skill}</span>
              <span className="text-sm text-gray-600">{t.score}: {g.avg}/5</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function SkillsMatrix({ t }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return employees.filter(
      (e) => e.name.toLowerCase().includes(q) || e.department.toLowerCase().includes(q)
    );
  }, [query]);

  const colorClass = (score) => {
    if (score <= 1) return "bg-red-500 text-white";
    if (score === 2) return "bg-orange-500 text-white";
    if (score === 3) return "bg-yellow-400 text-gray-900";
    if (score === 4) return "bg-green-400 text-gray-900";
    return "bg-green-600 text-white";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchEmployees}
          className="card px-3 py-2 w-72 outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>
      <div className="card overflow-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3 border-b">{t.employeeDirectory}</th>
              <th className="text-left p-3 border-b">{t.department}</th>
              {skills.map((s) => (
                <th key={s} className="text-left p-3 border-b">{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="odd:bg-gray-50">
                <td className="p-3 border-b">{e.name}</td>
                <td className="p-3 border-b">{e.department}</td>
                {skills.map((s) => (
                  <td key={s} className="p-2 border-b">
                    <div className={`rounded-md text-center text-sm px-2 py-1 ${colorClass(e.scores[s] ?? 0)}`}>
                      {e.scores[s] ?? 0}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmployeeDirectory({ t }) {
  return (
    <div className="card p-4">
      <h2 className="text-lg font-semibold mb-3">{t.employeeDirectory}</h2>
      <ul className="divide-y">
        {employees.map((e) => (
          <li key={e.id} className="py-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{e.name}</div>
              <div className="text-sm text-gray-600">{t.department}: {e.department}</div>
            </div>
            <div className="flex gap-2">
              {Object.entries(e.scores).map(([k, v]) => (
                <span key={k} className="text-xs px-2 py-1 rounded bg-gray-100">{k}: {v}</span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LearningPaths({ t }) {
  const sample = [
    { title: "Digital Literacy Basics", level: "Beginner", duration: "2 weeks" },
    { title: "RRA Compliance Workshop", level: "Intermediate", duration: "1 week" },
    { title: "Leadership Essentials", level: "Intermediate", duration: "3 weeks" }
  ];
  return (
    <div className="card p-4">
      <h2 className="text-lg font-semibold mb-3">{t.learningPaths}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sample.map((c) => (
          <div key={c.title} className="p-4 rounded-lg border border-gray-200">
            <div className="font-semibold text-gray-900">{c.title}</div>
            <div className="text-sm text-gray-700 mt-1">{c.level}</div>
            <div className="text-xs text-gray-500 mt-1">{c.duration}</div>
            <button className="btn btn-primary mt-3">Enroll</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DepartmentManagement({ t, departments, setDepartments }) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", readiness: "" });

  const handleEdit = (dept) => {
    setEditingId(dept.id);
    setFormData({ name: dept.name, readiness: dept.readiness.toString() });
  };

  const handleSave = () => {
    if (editingId === "new") {
      const newDept = {
        id: formData.name.substring(0, 3).toUpperCase(),
        name: formData.name,
        readiness: parseFloat(formData.readiness)
      };
      setDepartments([...departments, newDept]);
    } else {
      setDepartments(departments.map(d => 
        d.id === editingId 
          ? { ...d, name: formData.name, readiness: parseFloat(formData.readiness) }
          : d
      ));
    }
    setEditingId(null);
    setFormData({ name: "", readiness: "" });
  };

  const handleDelete = (id) => {
    setDepartments(departments.filter(d => d.id !== id));
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", readiness: "" });
  };

  const handleAddNew = () => {
    setEditingId("new");
    setFormData({ name: "", readiness: "" });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.departmentManagement}</h2>
        <button onClick={handleAddNew} className="btn btn-primary">
          <Plus className="h-4 w-4" />
          {t.addNew}
        </button>
      </div>
      
      <div className="card overflow-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3 border-b">{t.departmentName}</th>
              <th className="text-left p-3 border-b">{t.readiness}</th>
              <th className="text-left p-3 border-b">{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {editingId === "new" && (
              <tr className="border-b">
                <td className="p-3">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    placeholder={t.departmentName}
                  />
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.readiness}
                    onChange={(e) => setFormData({ ...formData, readiness: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    placeholder="0-5"
                  />
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="btn btn-primary">
                      <Save className="h-4 w-4" />
                      {t.save}
                    </button>
                    <button onClick={handleCancel} className="btn">
                      <X className="h-4 w-4" />
                      {t.cancel}
                    </button>
                  </div>
                </td>
              </tr>
            )}
            {departments.map((dept) => (
              <tr key={dept.id} className="border-b">
                {editingId === dept.id ? (
                  <>
                    <td className="p-3">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.readiness}
                        onChange={(e) => setFormData({ ...formData, readiness: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button onClick={handleSave} className="btn btn-primary">
                          <Save className="h-4 w-4" />
                          {t.save}
                        </button>
                        <button onClick={handleCancel} className="btn">
                          <X className="h-4 w-4" />
                          {t.cancel}
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-3 font-medium">{dept.name}</td>
                    <td className="p-3">{dept.readiness}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(dept)} 
                          className="btn"
                          title={t.editDepartment}
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(dept.id)} 
                          className="btn text-red-600 hover:text-red-800"
                          title={t.deleteDepartment}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmployeeManagement({ t, employees, setEmployees, departments }) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ 
    name: "", 
    department: "", 
    scores: {} 
  });

  const handleEdit = (employee) => {
    setEditingId(employee.id);
    setFormData({ 
      name: employee.name, 
      department: employee.department, 
      scores: { ...employee.scores } 
    });
  };

  const handleSave = () => {
    if (editingId === "new") {
      const newEmployee = {
        id: Math.max(...employees.map(e => e.id)) + 1,
        name: formData.name,
        department: formData.department,
        scores: formData.scores
      };
      setEmployees([...employees, newEmployee]);
    } else {
      setEmployees(employees.map(e => 
        e.id === editingId 
          ? { ...e, name: formData.name, department: formData.department, scores: formData.scores }
          : e
      ));
    }
    setEditingId(null);
    setFormData({ name: "", department: "", scores: {} });
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", department: "", scores: {} });
  };

  const handleAddNew = () => {
    setEditingId("new");
    const initialScores = {};
    skills.forEach(skill => {
      initialScores[skill] = 0;
    });
    setFormData({ name: "", department: "", scores: initialScores });
  };

  const handleSkillChange = (skill, value) => {
    setFormData({
      ...formData,
      scores: {
        ...formData.scores,
        [skill]: parseInt(value) || 0
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.employeeManagement}</h2>
        <button onClick={handleAddNew} className="btn btn-primary">
          <Plus className="h-4 w-4" />
          {t.addNew}
        </button>
      </div>
      
      <div className="card overflow-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3 border-b">{t.employeeName}</th>
              <th className="text-left p-3 border-b">{t.department}</th>
              {skills.map((skill) => (
                <th key={skill} className="text-left p-3 border-b text-sm">{skill}</th>
              ))}
              <th className="text-left p-3 border-b">{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {editingId === "new" && (
              <tr className="border-b">
                <td className="p-3">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    placeholder={t.employeeName}
                  />
                </td>
                <td className="p-3">
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  >
                    <option value="">{t.department}</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                </td>
                {skills.map((skill) => (
                  <td key={skill} className="p-3">
                    <input
                      type="number"
                      min="0"
                      max="5"
                      value={formData.scores[skill] || 0}
                      onChange={(e) => handleSkillChange(skill, e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded"
                    />
                  </td>
                ))}
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="btn btn-primary">
                      <Save className="h-4 w-4" />
                      {t.save}
                    </button>
                    <button onClick={handleCancel} className="btn">
                      <X className="h-4 w-4" />
                      {t.cancel}
                    </button>
                  </div>
                </td>
              </tr>
            )}
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b">
                {editingId === employee.id ? (
                  <>
                    <td className="p-3">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      />
                    </td>
                    <td className="p-3">
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      >
                        {departments.map((dept) => (
                          <option key={dept.id} value={dept.name}>{dept.name}</option>
                        ))}
                      </select>
                    </td>
                    {skills.map((skill) => (
                      <td key={skill} className="p-3">
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={formData.scores[skill] || 0}
                          onChange={(e) => handleSkillChange(skill, e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                    ))}
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button onClick={handleSave} className="btn btn-primary">
                          <Save className="h-4 w-4" />
                          {t.save}
                        </button>
                        <button onClick={handleCancel} className="btn">
                          <X className="h-4 w-4" />
                          {t.cancel}
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="p-3 font-medium">{employee.name}</td>
                    <td className="p-3">{employee.department}</td>
                    {skills.map((skill) => (
                      <td key={skill} className="p-3">
                        <div className={`rounded-md text-center text-sm px-2 py-1 ${
                          (employee.scores[skill] ?? 0) <= 1 ? "bg-red-500 text-white" :
                          (employee.scores[skill] ?? 0) === 2 ? "bg-orange-500 text-white" :
                          (employee.scores[skill] ?? 0) === 3 ? "bg-yellow-400 text-gray-900" :
                          (employee.scores[skill] ?? 0) === 4 ? "bg-green-400 text-gray-900" :
                          "bg-green-600 text-white"
                        }`}>
                          {employee.scores[skill] ?? 0}
                        </div>
                      </td>
                    ))}
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(employee)} 
                          className="btn"
                          title={t.editEmployee}
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(employee.id)} 
                          className="btn text-red-600 hover:text-red-800"
                          title={t.deleteEmployee}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SkillsManagement({ t, skillsList, setSkillsList, employees }) {
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  const handleEdit = (skill) => {
    setEditingId(skill);
    setFormData({ name: skill });
  };

  const handleSave = () => {
    if (editingId === "new") {
      setSkillsList([...skillsList, formData.name]);
    } else {
      setSkillsList(skillsList.map(s => 
        s === editingId ? formData.name : s
      ));
    }
    setEditingId(null);
    setFormData({ name: "" });
  };

  const handleDelete = (skill) => {
    setSkillsList(skillsList.filter(s => s !== skill));
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "" });
  };

  const handleAddNew = () => {
    setEditingId("new");
    setFormData({ name: "" });
  };

  const getSkillStats = (skill) => {
    const employeesWithSkill = employees.filter(e => e.scores[skill] !== undefined);
    const totalScore = employeesWithSkill.reduce((sum, e) => sum + (e.scores[skill] || 0), 0);
    const averageScore = employeesWithSkill.length > 0 ? (totalScore / employeesWithSkill.length).toFixed(1) : 0;
    
    return {
      totalEmployees: employeesWithSkill.length,
      averageScore: parseFloat(averageScore)
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.skillsManagement}</h2>
        <button onClick={handleAddNew} className="btn btn-primary">
          <Plus className="h-4 w-4" />
          {t.addNew}
        </button>
      </div>
      
      <div className="card overflow-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-3 border-b">{t.skillName}</th>
              <th className="text-left p-3 border-b">{t.totalEmployees}</th>
              <th className="text-left p-3 border-b">{t.averageScore}</th>
              <th className="text-left p-3 border-b">{t.actions}</th>
            </tr>
          </thead>
          <tbody>
            {editingId === "new" && (
              <tr className="border-b">
                <td className="p-3">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ name: e.target.value })}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    placeholder={t.skillName}
                  />
                </td>
                <td className="p-3">-</td>
                <td className="p-3">-</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={handleSave} className="btn btn-primary">
                      <Save className="h-4 w-4" />
                      {t.save}
                    </button>
                    <button onClick={handleCancel} className="btn">
                      <X className="h-4 w-4" />
                      {t.cancel}
                    </button>
                  </div>
                </td>
              </tr>
            )}
            {skillsList.map((skill) => {
              const stats = getSkillStats(skill);
              return (
                <tr key={skill} className="border-b">
                  {editingId === skill ? (
                    <>
                      <td className="p-3">
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ name: e.target.value })}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="p-3">-</td>
                      <td className="p-3">-</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button onClick={handleSave} className="btn btn-primary">
                            <Save className="h-4 w-4" />
                            {t.save}
                          </button>
                          <button onClick={handleCancel} className="btn">
                            <X className="h-4 w-4" />
                            {t.cancel}
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="p-3 font-medium">{skill}</td>
                      <td className="p-3">{stats.totalEmployees}</td>
                      <td className="p-3">
                        <div className={`rounded-md text-center text-sm px-2 py-1 inline-block ${
                          stats.averageScore <= 1 ? "bg-red-500 text-white" :
                          stats.averageScore <= 2 ? "bg-orange-500 text-white" :
                          stats.averageScore <= 3 ? "bg-yellow-400 text-gray-900" :
                          stats.averageScore <= 4 ? "bg-green-400 text-gray-900" :
                          "bg-green-600 text-white"
                        }`}>
                          {stats.averageScore}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEdit(skill)} 
                            className="btn"
                            title={t.editSkill}
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(skill)} 
                            className="btn text-red-600 hover:text-red-800"
                            title={t.deleteSkill}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
  const t = TEXTS[lang];
  const [page, setPage] = useState("dashboard");
  const [isAdmin, setIsAdmin] = useState(true); // For demo purposes, set to true
  const [departmentsState, setDepartmentsState] = useState(departments);
  const [employeesState, setEmployeesState] = useState(employees);
  const [skillsState, setSkillsState] = useState(skills);

  return (
    <div className="h-full flex">
      <Sidebar current={page} onNavigate={setPage} t={t} isAdmin={isAdmin} />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold text-gray-900">
            {page === "dashboard" && t.dashboard}
            {page === "skillsMatrix" && t.skillsMatrix}
            {page === "employeeDirectory" && t.employeeDirectory}
            {page === "employeeManagement" && t.employeeManagement}
            {page === "learningPaths" && t.learningPaths}
            {page === "departmentManagement" && t.departmentManagement}
            {page === "skillsManagement" && t.skillsManagement}
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                className="btn"
                onClick={() => setIsAdmin(!isAdmin)}
                title="Toggle Admin Mode"
              >
                <span className="text-gray-800 font-medium">{t.adminPanel}</span>
              </button>
            )}
            <button
              className="btn"
              onClick={() => setLang(lang === "en" ? "rw" : "en")}
              aria-label="Toggle language"
              title="Toggle language"
            >
              <Globe className="h-5 w-5 text-gray-600" />
              <span className="text-gray-800 font-medium">{t.language}</span>
            </button>
          </div>
        </div>
        {page === "dashboard" && <Dashboard t={t} />}
        {page === "skillsMatrix" && <SkillsMatrix t={t} />}
        {page === "employeeDirectory" && <EmployeeDirectory t={t} />}
        {page === "employeeManagement" && (
          <EmployeeManagement 
            t={t} 
            employees={employeesState} 
            setEmployees={setEmployeesState}
            departments={departmentsState}
          />
        )}
        {page === "learningPaths" && <LearningPaths t={t} />}
        {page === "departmentManagement" && (
          <DepartmentManagement 
            t={t} 
            departments={departmentsState} 
            setDepartments={setDepartmentsState} 
          />
        )}
        {page === "skillsManagement" && (
          <SkillsManagement 
            t={t} 
            skillsList={skillsState} 
            setSkillsList={setSkillsState}
            employees={employeesState}
          />
        )}
      </main>
    </div>
  );
}
