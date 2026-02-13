import { useMemo, useState } from "react";
import { LayoutDashboard, Table2, Users, GraduationCap, Globe, Building, Plus, Edit2, Trash2, Save, X, Brain, Target, Shield, BookOpen, BarChart3, TestTube } from "lucide-react";
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
    assessmentCenter: "Assessment Center",
    skillGapAnalysis: "Skill Gap Analysis",
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
    totalEmployees: "Total Employees",
    adaptiveTesting: "Adaptive Testing",
    handsOnSandbox: "Hands-on Sandbox",
    situationalJudgement: "Situational Judgement",
    startAssessment: "Start Assessment",
    questionType: "Question Type",
    difficulty: "Difficulty",
    timeLimit: "Time Limit",
    proctoringEnabled: "Proctoring Enabled",
    antiCheating: "Anti-Cheating",
    aiProctoring: "AI Proctoring",
    browserLockdown: "Browser Lockdown",
    plagiarismDetection: "Plagiarism Detection",
    integrations: "Integrations",
    atsIntegration: "ATS Integration",
    lmsIntegration: "LMS Integration",
    contentLibrary: "Content Library",
    customQuestions: "Custom Questions",
    benchmarking: "Benchmarking",
    industryComparison: "Industry Comparison",
    proficiencyLevel: "Proficiency Level",
    individualAnalysis: "Individual Analysis",
    companyAnalysis: "Company Analysis",
    heatMap: "Heat Map",
    talentDensity: "Talent Density",
    skillMatrix: "Skill Matrix",
    assessmentResults: "Assessment Results",
    testHistory: "Test History",
    performanceMetrics: "Performance Metrics"
  },
  rw: {
    dashboard: "Ibibaho",
    skillsMatrix: "Imbonerahamwe y'Ubumenyi",
    employeeDirectory: "Urutonde rw'Abakozi",
    employeeManagement: "Ukuyobora Abakozi",
    learningPaths: "Inyigisho",
    departmentManagement: "Ukuyobora Amashami",
    skillsManagement: "Ukuyobora Ubumenyi",
    assessmentCenter: "Igihugu c'Ugerageza",
    skillGapAnalysis: "Gusubiramo amakuru y'Ubumenyi",
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
    totalEmployees: "Umubare w'Abakozi",
    adaptiveTesting: "Ugerageza rwihangira",
    handsOnSandbox: "Ahagana mu gukora",
    situationalJudgement: "Ugerageza mu Mibereho",
    startAssessment: "Tangiza ugerageza",
    questionType: "Ubwoko bw'Ikibazo",
    difficulty: "Ububabare",
    timeLimit: "Igihe cy'akazi",
    proctoringEnabled: "Ukurikiranwa kuwugerageza",
    antiCheating: "Kwirinda kwihangira",
    aiProctoring: "AI ukurikiranwa",
    browserLockdown: "Gufunga Mucukumbuzi",
    plagiarismDetection: "Gusanga kwandika",
    integrations: "Zimyangiza",
    atsIntegration: "ATS zimyangiza",
    lmsIntegration: "LMS zimyangiza",
    contentLibrary: "Isomero ry'ibikubiyemo",
    customQuestions: "Ikibazo gihariye",
    benchmarking: "Kugereranya",
    industryComparison: "Kugereranya mu bucuruzi",
    proficiencyLevel: "Urwego r'ubumenyi",
    individualAnalysis: "Gusubiramo umuntu kuwundi",
    companyAnalysis: "Gusubiramo isosiyete",
    heatMap: "Karata y'Umuriro",
    talentDensity: "Ubusumbane bw'Abadufite",
    skillMatrix: "Imbonerahamwe y'Ubumenyi",
    assessmentResults: "Ibisubizo by'Ugerageza",
    testHistory: "Amateka y'Ugerageza",
    performanceMetrics: "ibipimo by'akazi"
  }
};

function Sidebar({ current, onNavigate, t, isAdmin }) {
  const links = [
    { key: "dashboard", label: t.dashboard, icon: LayoutDashboard },
    { key: "skillsMatrix", label: t.skillsMatrix, icon: Table2 },
    { key: "employeeDirectory", label: t.employeeDirectory, icon: Users },
    { key: "learningPaths", label: t.learningPaths, icon: GraduationCap },
    { key: "assessmentCenter", label: t.assessmentCenter, icon: Brain },
    { key: "skillGapAnalysis", label: t.skillGapAnalysis, icon: BarChart3 }
  ];
  
  if (isAdmin) {
    links.push(
      { key: "employeeManagement", label: t.employeeManagement, icon: Users },
      { key: "departmentManagement", label: t.departmentManagement, icon: Building },
      { key: "skillsManagement", label: t.skillsManagement, icon: GraduationCap },
      { key: "integrations", label: t.integrations, icon: Shield },
      { key: "contentLibrary", label: t.contentLibrary, icon: BookOpen },
      { key: "benchmarking", label: t.benchmarking, icon: Target }
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

function AssessmentCenter({ t }) {
  const [selectedTestType, setSelectedTestType] = useState("");
  const [testConfig, setTestConfig] = useState({
    skill: "",
    difficulty: "medium",
    timeLimit: 30,
    proctoringEnabled: false,
    adaptiveMode: false
  });

  const testTypes = [
    {
      id: "adaptive",
      name: t.adaptiveTesting,
      description: "Questions adjust difficulty based on performance",
      icon: Brain,
      features: ["Adaptive difficulty", "Real-time adjustment", "Personalized experience"]
    },
    {
      id: "hands-on",
      name: t.handsOnSandbox,
      description: "Practical coding and technical environments",
      icon: TestTube,
      features: ["Live coding environment", "Real-world scenarios", "Performance-based"]
    },
    {
      id: "situational",
      name: t.situationalJudgement,
      description: "Video and text-based scenario testing",
      icon: Target,
      features: ["Soft skills assessment", "Leadership evaluation", "Behavioral analysis"]
    }
  ];

  const handleStartAssessment = () => {
    // Implementation would start the actual assessment
    console.log("Starting assessment with config:", testConfig);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.assessmentCenter}</h2>
      </div>

      {/* Test Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testTypes.map((type) => (
          <div 
            key={type.id}
            className={`card p-4 cursor-pointer transition-all ${
              selectedTestType === type.id ? "ring-2 ring-gray-800" : ""
            }`}
            onClick={() => setSelectedTestType(type.id)}
          >
            <div className="flex items-center gap-3 mb-3">
              <type.icon className="h-8 w-8 text-gray-700" />
              <h3 className="font-semibold text-lg">{type.name}</h3>
            </div>
            <p className="text-gray-600 mb-3">{type.description}</p>
            <ul className="space-y-1">
              {type.features.map((feature, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Test Configuration */}
      {selectedTestType && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Assessment Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t.skills}</label>
              <select
                value={testConfig.skill}
                onChange={(e) => setTestConfig({ ...testConfig, skill: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a skill</option>
                {skills.map((skill) => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">{t.difficulty}</label>
              <select
                value={testConfig.difficulty}
                onChange={(e) => setTestConfig({ ...testConfig, difficulty: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">{t.timeLimit} (minutes)</label>
              <input
                type="number"
                min="5"
                max="180"
                value={testConfig.timeLimit}
                onChange={(e) => setTestConfig({ ...testConfig, timeLimit: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={testConfig.adaptiveMode}
                  onChange={(e) => setTestConfig({ ...testConfig, adaptiveMode: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium">Adaptive Mode</span>
              </label>
              
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={testConfig.proctoringEnabled}
                  onChange={(e) => setTestConfig({ ...testConfig, proctoringEnabled: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm font-medium">{t.proctoringEnabled}</span>
              </label>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button 
              onClick={handleStartAssessment}
              className="btn btn-primary"
              disabled={!testConfig.skill}
            >
              <Brain className="h-4 w-4" />
              {t.startAssessment}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SkillGapAnalysis({ t, employees, departments, skillsList }) {
  const [analysisType, setAnalysisType] = useState("individual");
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const getIndividualAnalysis = (employeeId) => {
    const employee = employees.find(e => e.id === parseInt(employeeId));
    if (!employee) return null;
    
    return {
      name: employee.name,
      department: employee.department,
      skills: Object.entries(employee.scores).map(([skill, score]) => ({
        skill,
        score,
        proficiency: score <= 1 ? "Beginner" : score <= 2 ? "Novice" : score <= 3 ? "Intermediate" : score <= 4 ? "Advanced" : "Expert",
        gap: Math.max(0, 5 - score)
      }))
    };
  };

  const individualData = selectedEmployee ? getIndividualAnalysis(selectedEmployee) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.skillGapAnalysis}</h2>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setAnalysisType("individual")}
          className={`px-4 py-2 rounded-md font-medium transition ${
            analysisType === "individual" 
              ? "bg-gray-800 text-white" 
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {t.individualAnalysis}
        </button>
      </div>

      {analysisType === "individual" && (
        <div className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Select Employee</label>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Choose an employee</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
          </div>

          {individualData && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">
                {individualData.name} - {individualData.department}
              </h3>
              <div className="space-y-3">
                {individualData.skills.map((skillData, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{skillData.skill}</div>
                      <div className="text-sm text-gray-600">{skillData.proficiency}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{skillData.score}</div>
                        <div className="text-xs text-gray-500">Current</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${
                          skillData.gap > 3 ? "text-red-600" : "text-green-600"
                        }`}>
                          {skillData.gap}
                        </div>
                        <div className="text-xs text-gray-500">Gap</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Integrations({ t }) {
  const [integrations, setIntegrations] = useState({
    ats: { enabled: false, apiKey: "", system: "" },
    lms: { enabled: false, apiKey: "", system: "" },
    proctoring: {
      aiProctoring: false,
      browserLockdown: false,
      plagiarismDetection: false
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.integrations}</h2>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">{t.antiCheating}</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="h-6 w-6 text-gray-700" />
                <h4 className="font-medium">{t.aiProctoring}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Monitor webcam, mic, and screen activity for suspicious behavior
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={integrations.proctoring.aiProctoring}
                  className="rounded"
                />
                <span className="text-sm font-medium">Enable AI Proctoring</span>
              </label>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-6 w-6 text-gray-700" />
                <h4 className="font-medium">{t.browserLockdown}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Prevent users from opening Google or ChatGPT in another tab
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={integrations.proctoring.browserLockdown}
                  className="rounded"
                />
                <span className="text-sm font-medium">Enable Browser Lockdown</span>
              </label>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Target className="h-6 w-6 text-gray-700" />
                <h4 className="font-medium">{t.plagiarismDetection}</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Check code or text against database of known answers
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={integrations.proctoring.plagiarismDetection}
                  className="rounded"
                />
                <span className="text-sm font-medium">Enable Plagiarism Detection</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentLibrary({ t }) {
  const [content, setContent] = useState({
    type: "library",
    questions: []
  });
  const [newQuestion, setNewQuestion] = useState({
    type: "multiple-choice",
    skill: "",
    difficulty: "medium",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    timeLimit: 30
  });

  const sampleQuestions = [
    {
      id: 1,
      type: "multiple-choice",
      skill: "JavaScript",
      difficulty: "medium",
      question: "What is the purpose of the 'useEffect' hook in React?",
      options: [
        "To fetch data from an API",
        "To handle side effects in functional components",
        "To style components",
        "To manage state"
      ],
      correctAnswer: "To handle side effects in functional components",
      category: "Technical"
    },
    {
      id: 2,
      type: "situational",
      skill: "Leadership",
      difficulty: "hard",
      question: "Your team member missed a critical deadline. How do you handle this situation?",
      scenario: "A team member has missed a critical project deadline that affects the entire team's deliverables. The client is expecting the deliverables tomorrow.",
      category: "Soft Skills"
    }
  ];

  const handleAddQuestion = () => {
    setContent(prev => ({
      ...prev,
      questions: [...prev.questions, { ...newQuestion, id: Date.now() }]
    }));
    setNewQuestion({
      type: "multiple-choice",
      skill: "",
      difficulty: "medium",
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      timeLimit: 30
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...newQuestion.options];
    newOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: newOptions });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.contentLibrary}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setContent({ ...content, type: "library" })}
            className={`px-4 py-2 rounded-md font-medium transition ${
              content.type === "library" 
                ? "bg-gray-800 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Question Library
          </button>
          <button
            onClick={() => setContent({ ...content, type: "builder" })}
            className={`px-4 py-2 rounded-md font-medium transition ${
              content.type === "builder" 
                ? "bg-gray-800 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <Plus className="h-4 w-4" />
            {t.customQuestions}
          </button>
        </div>
      </div>

      {content.type === "library" && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Question Library</h3>
          <div className="space-y-4">
            {sampleQuestions.map((q) => (
              <div key={q.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      q.difficulty === "easy" ? "bg-green-100 text-green-800" :
                      q.difficulty === "medium" ? "bg-yellow-100 text-yellow-800" :
                      q.difficulty === "hard" ? "bg-orange-100 text-orange-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {q.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium">
                      {q.skill}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{q.category}</span>
                </div>
                <div className="font-medium mb-2">{q.question}</div>
                {q.type === "multiple-choice" && (
                  <div className="space-y-2">
                    {q.options.map((option, index) => (
                      <div key={index} className={`p-2 border rounded ${
                        option === q.correctAnswer ? "border-green-500 bg-green-50" : "border-gray-300"
                      }`}>
                        {option}
                      </div>
                    ))}
                  </div>
                )}
                {q.scenario && (
                  <div className="p-3 bg-gray-50 rounded border">
                    <p className="text-sm text-gray-700">{q.scenario}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {content.type === "builder" && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Question Builder</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Question Type</label>
                <select
                  value={newQuestion.type}
                  onChange={(e) => setNewQuestion({ ...newQuestion, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="true-false">True/False</option>
                  <option value="situational">Situational Judgement</option>
                  <option value="coding">Coding Challenge</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Skill</label>
                <select
                  value={newQuestion.skill}
                  onChange={(e) => setNewQuestion({ ...newQuestion, skill: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select a skill</option>
                  {skills.map((skill) => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Difficulty</label>
                <select
                  value={newQuestion.difficulty}
                  onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Time Limit (minutes)</label>
                <input
                  type="number"
                  min="5"
                  max="180"
                  value={newQuestion.timeLimit}
                  onChange={(e) => setNewQuestion({ ...newQuestion, timeLimit: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Question</label>
              <textarea
                value={newQuestion.question}
                onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={4}
                placeholder="Enter your question here..."
              />
            </div>

            {newQuestion.type === "multiple-choice" && (
              <div>
                <label className="block text-sm font-medium mb-2">Answer Options</label>
                <div className="space-y-2">
                  {newQuestion.options.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        placeholder={`Option ${index + 1}`}
                      />
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={newQuestion.correctAnswer === option}
                          onChange={() => setNewQuestion({ ...newQuestion, correctAnswer: option })}
                        />
                        <span className="text-sm font-medium">Correct</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button onClick={handleAddQuestion} className="btn btn-primary">
                <Plus className="h-4 w-4" />
                Add Question
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Benchmarking({ t }) {
  const [benchmarkType, setBenchmarkType] = useState("industry");
  const [selectedSkill, setSelectedSkill] = useState("");

  const industryData = [
    {
      skill: "JavaScript",
      companyScore: 3.8,
      industryAverage: 3.2,
      industryTop10: 4.5,
      percentile: 75,
      trend: "improving"
    },
    {
      skill: "Python",
      companyScore: 2.9,
      industryAverage: 3.5,
      industryTop10: 4.2,
      percentile: 45,
      trend: "stable"
    },
    {
      skill: "Leadership",
      companyScore: 4.1,
      industryAverage: 3.0,
      industryTop10: 4.4,
      percentile: 85,
      trend: "leading"
    },
    {
      skill: "Data Analysis",
      companyScore: 3.3,
      industryAverage: 2.8,
      industryTop10: 3.9,
      percentile: 70,
      trend: "improving"
    }
  ];

  const getPercentileColor = (percentile) => {
    if (percentile >= 90) return "text-green-600";
    if (percentile >= 75) return "text-blue-600";
    if (percentile >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "improving": return "📈";
      case "stable": return "➡️";
      case "leading": return "🏆";
      case "declining": return "📉";
      default: return "➡️";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.benchmarking}</h2>
        <select
          value={benchmarkType}
          onChange={(e) => setBenchmarkType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="industry">{t.industryComparison}</option>
          <option value="internal">Internal Comparison</option>
          <option value="historical">Historical Performance</option>
        </select>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold mb-4">{t.industryComparison}</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Skill</label>
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Skills</option>
            {industryData.map((data) => (
              <option key={data.skill} value={data.skill}>{data.skill}</option>
            ))}
          </select>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 border-b">Skill</th>
                <th className="text-left p-3 border-b">Your Score</th>
                <th className="text-left p-3 border-b">Industry Avg</th>
                <th className="text-left p-3 border-b">Top 10%</th>
                <th className="text-left p-3 border-b">Percentile</th>
                <th className="text-left p-3 border-b">Trend</th>
              </tr>
            </thead>
            <tbody>
              {industryData
                .filter(data => !selectedSkill || data.skill === selectedSkill)
                .map((data, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 font-medium">{data.skill}</td>
                    <td className="p-3">
                      <div className={`rounded-md text-center text-sm px-2 py-1 inline-block ${
                        data.companyScore <= 1 ? "bg-red-500 text-white" :
                        data.companyScore <= 2 ? "bg-orange-500 text-white" :
                        data.companyScore <= 3 ? "bg-yellow-400 text-gray-900" :
                        data.companyScore <= 4 ? "bg-green-400 text-gray-900" :
                        "bg-green-600 text-white"
                      }`}>
                        {data.companyScore}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className={`rounded-md text-center text-sm px-2 py-1 inline-block ${
                        data.industryAverage <= 1 ? "bg-red-500 text-white" :
                        data.industryAverage <= 2 ? "bg-orange-500 text-white" :
                        data.industryAverage <= 3 ? "bg-yellow-400 text-gray-900" :
                        data.industryAverage <= 4 ? "bg-green-400 text-gray-900" :
                        "bg-green-600 text-white"
                      }`}>
                        {data.industryAverage}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className={`rounded-md text-center text-sm px-2 py-1 inline-block ${
                        data.industryTop10 <= 1 ? "bg-red-500 text-white" :
                        data.industryTop10 <= 2 ? "bg-orange-500 text-white" :
                        data.industryTop10 <= 3 ? "bg-yellow-400 text-gray-900" :
                        data.industryTop10 <= 4 ? "bg-green-400 text-gray-900" :
                        "bg-green-600 text-white"
                      }`}>
                        {data.industryTop10}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`font-bold ${getPercentileColor(data.percentile)}`}>
                        {data.percentile}th
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="text-lg">{getTrendIcon(data.trend)}</span>
                      <span className="ml-2 text-sm capitalize">{data.trend}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Key Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-green-600">Strengths:</div>
              <ul className="mt-1 space-y-1">
                <li>• Leadership skills in top 15% globally</li>
                <li>• Above industry average in 3 out of 4 skills</li>
              </ul>
            </div>
            <div>
              <div className="font-medium text-orange-600">Areas for Improvement:</div>
              <ul className="mt-1 space-y-1">
                <li>• Python skills below industry average</li>
                <li>• Data analysis room for growth</li>
              </ul>
            </div>
          </div>
        </div>
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
            {page === "assessmentCenter" && t.assessmentCenter}
            {page === "skillGapAnalysis" && t.skillGapAnalysis}
            {page === "integrations" && t.integrations}
            {page === "contentLibrary" && t.contentLibrary}
            {page === "benchmarking" && t.benchmarking}
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
        {page === "assessmentCenter" && <AssessmentCenter t={t} />}
        {page === "skillGapAnalysis" && (
          <SkillGapAnalysis 
            t={t} 
            employees={employeesState}
            departments={departmentsState}
            skillsList={skillsState}
          />
        )}
        {page === "integrations" && <Integrations t={t} />}
        {page === "contentLibrary" && <ContentLibrary t={t} />}
        {page === "benchmarking" && <Benchmarking t={t} />}
      </main>
    </div>
  );
}
