import { useMemo, useState } from "react";
import { LayoutDashboard, Table2, Users, GraduationCap, Globe } from "lucide-react";
import { departments, skills, employees, computeSkillGaps } from "./data/mockData.js";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const TEXTS = {
  en: {
    dashboard: "Dashboard",
    skillsMatrix: "Skills Matrix",
    employeeDirectory: "Employee Directory",
    learningPaths: "Learning Paths",
    departmentReadiness: "Department Readiness",
    topSkillGaps: "Top 3 Skills Gaps",
    searchEmployees: "Search employees...",
    language: "Kinyarwanda",
    score: "Score",
    department: "Department"
  },
  rw: {
    dashboard: "Ibibaho",
    skillsMatrix: "Imbonerahamwe y'Ubumenyi",
    employeeDirectory: "Urutonde rw'Abakozi",
    learningPaths: "Inyigisho",
    departmentReadiness: "Uko Amashami yiteguye",
    topSkillGaps: "Imyanya 3 y'Ubumenyi ibura",
    searchEmployees: "Shakisha abakozi...",
    language: "English",
    score: "Amanota",
    department: "Ishami"
  }
};

function Sidebar({ current, onNavigate, t }) {
  const links = [
    { key: "dashboard", label: t.dashboard, icon: LayoutDashboard },
    { key: "skillsMatrix", label: t.skillsMatrix, icon: Table2 },
    { key: "employeeDirectory", label: t.employeeDirectory, icon: Users },
    { key: "learningPaths", label: t.learningPaths, icon: GraduationCap }
  ];
  return (
    <aside className="w-64 h-full border-r border-gray-200 bg-white">
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600" />
          <span className="text-lg font-semibold text-blue-700">Ganza Skills</span>
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
              <Bar dataKey="readiness" fill="#2563eb" radius={[8, 8, 0, 0]} />
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
          className="card px-3 py-2 w-72 outline-none focus:ring-2 focus:ring-blue-300"
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
            <div className="font-semibold text-blue-700">{c.title}</div>
            <div className="text-sm text-gray-700 mt-1">{c.level}</div>
            <div className="text-xs text-gray-500 mt-1">{c.duration}</div>
            <button className="btn btn-primary mt-3">Enroll</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");
  const t = TEXTS[lang];
  const [page, setPage] = useState("dashboard");

  return (
    <div className="h-full flex">
      <Sidebar current={page} onNavigate={setPage} t={t} />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold text-gray-900">
            {page === "dashboard" && t.dashboard}
            {page === "skillsMatrix" && t.skillsMatrix}
            {page === "employeeDirectory" && t.employeeDirectory}
            {page === "learningPaths" && t.learningPaths}
          </div>
          <button
            className="btn"
            onClick={() => setLang(lang === "en" ? "rw" : "en")}
            aria-label="Toggle language"
            title="Toggle language"
          >
            <Globe className="h-5 w-5 text-blue-600" />
            <span className="text-blue-700 font-medium">{t.language}</span>
          </button>
        </div>
        {page === "dashboard" && <Dashboard t={t} />}
        {page === "skillsMatrix" && <SkillsMatrix t={t} />}
        {page === "employeeDirectory" && <EmployeeDirectory t={t} />}
        {page === "learningPaths" && <LearningPaths t={t} />}
      </main>
    </div>
  );
}
